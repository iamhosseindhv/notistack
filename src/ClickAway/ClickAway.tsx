/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import { ownerDocument } from '../transitions/document-window';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../transitions/useForkRef';

function mapEventPropToEvent(eventProp: string): string {
    return eventProp.substring(2).toLowerCase() as any;
}

function clickedRootScrollbar(event: MouseEvent, doc: Document) {
    return (
        doc.documentElement.clientWidth < event.clientX
        || doc.documentElement.clientHeight < event.clientY
    );
}

const mouseEvent = 'onClick';
const touchEvent = 'onTouchEnd';

interface ClickAwayProps {
    /**
     * The wrapped element.
     */
    children: React.ReactElement;
    /**
     * Callback fired when a "click away" event is detected.
     */
    onClickAway: (event: React.SyntheticEvent<any>) => void;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
function ClickAway({ children, onClickAway }: ClickAwayProps): JSX.Element {
    const movedRef = React.useRef(false);
    const nodeRef = React.useRef<Element>(null);
    const activatedRef = React.useRef(false);
    const syntheticEventRef = React.useRef(false);

    React.useEffect(() => {
        // Ensure that this component is not "activated" synchronously.
        // https://github.com/facebook/react/issues/20074
        setTimeout(() => {
            activatedRef.current = true;
        }, 0);
        return () => {
            activatedRef.current = false;
        };
    }, []);

    const handleRef = useForkRef(children.ref, nodeRef);

    const handleClickAway = useEventCallback((event: any) => {
        const insideReactTree = syntheticEventRef.current;
        syntheticEventRef.current = false;

        const doc = ownerDocument(nodeRef.current);

        if (
            !activatedRef.current
            || !nodeRef.current
            || ('clientX' in event && clickedRootScrollbar(event, doc))
        ) {
            return;
        }

        if (movedRef.current) {
            movedRef.current = false;
            return;
        }

        let insideDOM;

        if (event.composedPath) {
            insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
        } else {
            insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
        }

        if (!insideDOM && (!insideReactTree)) {
            onClickAway(event);
        }
    });

    const createHandleSynthetic = (handlerName: string) => (event: React.SyntheticEvent) => {
        syntheticEventRef.current = true;

        const childrenPropsHandler = children.props[handlerName];
        if (childrenPropsHandler) {
            childrenPropsHandler(event);
        }
    };

    const childrenProps: { ref: React.Ref<Element> } & Pick<React.DOMAttributes<Element>, 'onClick' | 'onTouchEnd'> = { ref: handleRef };

    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);

    React.useEffect(() => {
        const mappedTouchEvent = mapEventPropToEvent(touchEvent);
        const doc = ownerDocument(nodeRef.current);

        const handleTouchMove = () => {
            movedRef.current = true;
        };

        doc.addEventListener(mappedTouchEvent, handleClickAway);
        doc.addEventListener('touchmove', handleTouchMove);

        return () => {
            doc.removeEventListener(mappedTouchEvent, handleClickAway);
            doc.removeEventListener('touchmove', handleTouchMove);
        };
    }, [handleClickAway, touchEvent]);

    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);

    React.useEffect(() => {
        const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
        const doc = ownerDocument(nodeRef.current);

        doc.addEventListener(mappedMouseEvent, handleClickAway);

        return () => {
            doc.removeEventListener(mappedMouseEvent, handleClickAway);
        };
    }, [handleClickAway, mouseEvent]);

    return <>{React.cloneElement(children, childrenProps)}</>;
}

export default ClickAway;

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme, emphasize } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import SnackbarContent from '../SnackbarContent';
import { getTransitionDirection, omitNonCollapseKeys } from './SnackbarItem.util';
import { allClasses, REASONS, SNACKBAR_INDENTS, objectMerge, DEFAULTS, transformer } from '../utils/constants';
import { SharedProps, RequiredBy, TransitionHandlerProps, SnackbarProviderProps as ProviderProps } from '../index';
import defaultIconVariants from '../utils/defaultIconVariants';
import createChainedFunction from '../utils/createChainedFunction';
import { Snack } from '../SnackbarProvider';
import Snackbar from './Snackbar';

const styles = (theme: Theme) => {
    // @ts-ignore
    const mode = theme.palette.mode || theme.palette.type;
    const backgroundColor = emphasize(theme.palette.background.default, mode === 'light' ? 0.8 : 0.98);
    return createStyles({
        ...allClasses.mui,
        lessPadding: {
            paddingLeft: 8 * 2.5,
        },
        variantSuccess: {
            backgroundColor: '#43a047 !important', // green
            color: '#fff !important',
        },
        variantError: {
            backgroundColor: '#d32f2f !important', // dark red
            color: '#fff !important',
        },
        variantInfo: {
            backgroundColor: '#2196f3 !important', // nice blue
            color: '#fff !important',
        },
        variantWarning: {
            backgroundColor: '#ff9800 !important', // amber
            color: '#fff !important',
        },
        contentRoot: {
            ...theme.typography.body2,
            backgroundColor,
            color: theme.palette.getContrastText(backgroundColor),
            alignItems: 'center',
            padding: '6px 16px',
            borderRadius: '4px',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
        },
        action: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingLeft: 16,
            marginRight: -8,
        },
        wrappedRoot: {
            position: 'relative',
            transform: 'translateX(0)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        collapseContainer: {
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(1),
                paddingRight: theme.spacing(1),
            },
        },
        collapseWrapper: {
            transition: theme.transitions.create(['margin-bottom'], { easing: 'ease' }),
            marginTop: SNACKBAR_INDENTS.snackbar.default,
            marginBottom: SNACKBAR_INDENTS.snackbar.default,
        },
        collapseWrapperDense: {
            marginTop: SNACKBAR_INDENTS.snackbar.dense,
            marginBottom: SNACKBAR_INDENTS.snackbar.dense,
        },
        collapseWrapperInner: {
            width: 'auto',
        },
    });
}


type RemovedProps =
    | 'variant' // the one received from Provider is processed and passed to snack prop 
    | 'anchorOrigin' // same as above
    | 'autoHideDuration' // same as above
    | 'preventDuplicate' // the one recevied from enqueueSnackbar is processed in provider, therefore shouldn't be passed to SnackbarItem */


export interface SnackbarItemProps extends WithStyles<typeof styles>, RequiredBy<Omit<SharedProps, RemovedProps>, 'onEntered' | 'onExited' | 'onClose'> {
    snack: Snack;
    dense: ProviderProps['dense'];
    iconVariant: ProviderProps['iconVariant'];
    hideIconVariant: ProviderProps['hideIconVariant'];
}

const SnackbarItem: React.FC<SnackbarItemProps> = ({ classes, ...props }) => {
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => (): void => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }, []);

    const handleClose = createChainedFunction([props.snack.onClose, props.onClose], props.snack.key);

    const handleEntered: TransitionHandlerProps['onEntered'] = () => {
        if (props.snack.requestClose) {
            handleClose(null, REASONS.INSTRCUTED);
        }
    };

    const handleExitedScreen = (): void => {
        timeout.current = setTimeout(() => {
            setCollapsed(!collapsed);
        }, 125);
    };

    const {
        style,
        dense,
        ariaAttributes: otherAriaAttributes,
        className: otherClassName,
        hideIconVariant,
        iconVariant,
        snack,
        action: otherAction,
        content: otherContent,
        TransitionComponent: otherTranComponent,
        TransitionProps: otherTranProps,
        transitionDuration: otherTranDuration,
        onEnter: ignoredOnEnter,
        onEntered: ignoredOnEntered,
        onEntering: ignoredOnEntering,
        onExit: ignoredOnExit,
        onExited: ignoredOnExited,
        onExiting: ignoredOnExiting,
        ...other
    } = props;

    const {
        persist,
        key,
        open,
        entered,
        requestClose,
        className: singleClassName,
        variant,
        content: singleContent,
        action: singleAction,
        ariaAttributes: singleAriaAttributes,
        anchorOrigin,
        message: snackMessage,
        TransitionComponent: singleTranComponent,
        TransitionProps: singleTranProps,
        transitionDuration: singleTranDuration,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        ...singleSnackProps
    } = snack;

    const icon = {
        ...defaultIconVariants,
        ...iconVariant,
    }[variant];

    const ariaAttributes = {
        'aria-describedby': 'notistack-snackbar',
        ...objectMerge(singleAriaAttributes, otherAriaAttributes),
    };

    const TransitionComponent = singleTranComponent || otherTranComponent || DEFAULTS.TransitionComponent;
    const transitionDuration = objectMerge(singleTranDuration, otherTranDuration, DEFAULTS.transitionDuration);
    const transitionProps = {
        direction: getTransitionDirection(anchorOrigin),
        ...objectMerge(singleTranProps, otherTranProps),
    };

    let action = singleAction || otherAction;
    if (typeof action === 'function') {
        action = action(key);
    }

    let content = singleContent || otherContent;
    if (typeof content === 'function') {
        content = content(key, snack.message);
    }

    const callbacks: { [key in keyof TransitionHandlerProps]?: any } =
        ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].reduce((acc, cbName) => ({
            ...acc,
            // @ts-ignore
            [cbName]: createChainedFunction([props.snack[cbName], props[cbName]], props.snack.key),
        }), {});

    return (
        <Collapse
            unmountOnExit
            timeout={175}
            in={collapsed}
            classes={omitNonCollapseKeys(classes, dense)}
            onExited={callbacks.onExited}
        >
            {/* @ts-ignore */}
            <Snackbar
                {...other}
                {...singleSnackProps}
                open={open}
                className={clsx(
                    classes.root,
                    classes.wrappedRoot,
                    classes[transformer.toAnchorOrigin(anchorOrigin)],
                )}
                onClose={handleClose}
            >
                {/* @ts-ignore */}
                <TransitionComponent
                    appear
                    in={open}
                    timeout={transitionDuration}
                    {...transitionProps}
                    onExit={callbacks.onExit}
                    onExiting={callbacks.onExiting}
                    onExited={handleExitedScreen}
                    onEnter={callbacks.onEnter}
                    onEntering={callbacks.onEntering}
                    // order matters. first callbacks.onEntered to set entered: true,
                    // then handleEntered to check if there's a request for closing
                    onEntered={createChainedFunction([callbacks.onEntered, handleEntered])}
                >
                    {/* @ts-ignore */}
                    {content || (
                        <SnackbarContent
                            {...ariaAttributes}
                            role="alert"
                            style={style}
                            className={clsx(
                                classes.contentRoot,
                                { [classes.lessPadding]: !hideIconVariant && icon },
                                classes[transformer.toVariant(variant)],
                                otherClassName,
                                singleClassName
                            )}
                        >
                            <div id={ariaAttributes['aria-describedby']} className={classes.message}>
                                {!hideIconVariant ? icon : null}
                                {snackMessage}
                            </div>
                            {action && (
                                <div className={classes.action}>{action}</div>
                            )}
                        </SnackbarContent>
                    )}
                </TransitionComponent>
            </Snackbar>
        </Collapse>
    );
};

export default withStyles(styles)(SnackbarItem);

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme, emphasize } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import SnackbarContent from '../SnackbarContent';
import { getTransitionDirection, omitNonMuiKeys, omitNonCollapseKeys } from './SnackbarItem.util';
import { capitalise, allClasses, REASONS, SNACKBAR_INDENTS } from '../utils/constants';
import { SnackbarProviderProps, OptionalBy, SharedProps, RequiredBy, IconVariant, VariantClassKey, TransitionHandlerProps } from '../index';
import { Snack } from '../SnackbarProvider';
import createChainedFunction from '../utils/createChainedFunction';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const styles = (theme: Theme) => {
    const backgroundColor = emphasize(theme.palette.background.default, theme.palette.type === 'light' ? 0.8 : 0.98);
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
    });
}


type RemovedProps =
    /** the one received from Provider is processed and passed to snack prop */
    | 'variant'
    /** same as above */
    | 'anchorOrigin'
    /** the one recevied from enqueueSnackbar is processed in provider, therefore shouldn't be passed to SnackbarItem */
    | 'preventDuplicate'


export interface SnackbarItemProps extends WithStyles<typeof styles>, RequiredBy<Omit<SharedProps, RemovedProps>, 'onEntered' | 'onExited' | 'onClose'> {
    snack: Snack;
    dense: SnackbarProviderProps['dense'];
    iconVariant: OptionalBy<IconVariant, 'default'>;
    hideIconVariant: SnackbarProviderProps['hideIconVariant'];
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

    const callbacks: { [key in keyof TransitionHandlerProps]?: any } =
        ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].reduce((acc, cbName) => ({
            ...acc,
            // @ts-ignore
            [cbName]: createChainedFunction([props.snack[cbName], props[cbName]], props.snack.key),
        }), {});

    const {
        action,
        content,
        ariaAttributes: otherAriaAttributes,
        className: otherClassName,
        hideIconVariant,
        iconVariant,
        snack,
        dense,
        TransitionComponent = Slide,
        TransitionProps: otherTransitionProps = {},
        ...other
    } = props;

    const {
        key,
        persist,
        entered,
        requestClose,
        className: singleClassName,
        variant,
        content: singleContent,
        action: singleAction,
        ariaAttributes: singleAriaAttributes,
        anchorOrigin,
        TransitionProps: singleTransitionProps = {},
        ...singleSnackProps
    } = snack;

    const icon = iconVariant[variant];

    const ariaAttributes = {
        'aria-describedby': 'client-snackbar',
        ...otherAriaAttributes,
        ...singleAriaAttributes,
    };

    const transitionProps = {
        direction: getTransitionDirection(anchorOrigin),
        ...otherTransitionProps,
        ...singleTransitionProps,
        onExited: handleExitedScreen,
    };

    let finalAction = singleAction || action;
    if (typeof finalAction === 'function') {
        // @ts-ignore
        finalAction = finalAction(key);
    }

    let snackContent = singleContent || content;
    if (snackContent && typeof snackContent === 'function') {
        snackContent = snackContent(key, snack.message);
    }

    return (
        <Collapse
            unmountOnExit
            timeout={175}
            in={collapsed}
            classes={omitNonCollapseKeys(classes, dense)}
            onExited={callbacks.onExited}
        >
            <Snackbar
                // @ts-ignore
                TransitionComponent={TransitionComponent}
                {...other}
                {...singleSnackProps}
                open={snack.open}
                anchorOrigin={anchorOrigin}
                TransitionProps={transitionProps}
                classes={omitNonMuiKeys(classes)}
                onClose={handleClose}
                onExit={callbacks.onExit}
                onExiting={callbacks.onExiting}
                onEnter={callbacks.onEnter}
                onEntering={callbacks.onEntering}
                // order matters. first callbacks.onEntered to set entered: true,
                // then handleEntered to check if there's a request for closing
                onEntered={createChainedFunction([callbacks.onEntered, handleEntered])}
            >
                {/* @ts-ignore */}
                {snackContent || (
                    <SnackbarContent
                        {...ariaAttributes}
                        role="alert"
                        className={clsx(
                            classes.contentRoot,
                            { [classes.lessPadding]: !hideIconVariant && icon },
                            classes[`variant${capitalise(variant)}` as VariantClassKey],
                            otherClassName,
                            singleClassName
                        )}
                    >
                        <div id={ariaAttributes['aria-describedby']} className={classes.message}>
                            {!hideIconVariant ? icon : null}
                            {snack.message}
                        </div>
                        {finalAction && (
                            <div className={classes.action}>{finalAction}</div>
                        )}
                    </SnackbarContent>
                )}
            </Snackbar>
        </Collapse>
    );
};

export default withStyles(styles)(SnackbarItem);

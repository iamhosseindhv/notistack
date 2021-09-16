import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { emphasize, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import type { SnackbarClassKey } from '@mui/material';
import SnackbarContent from '../SnackbarContent';
import { getTransitionDirection } from './SnackbarItem.util';
import { REASONS, objectMerge, DEFAULTS, transformer } from '../utils/constants';
import { SharedProps, RequiredBy, TransitionHandlerProps, SnackbarProviderProps as ProviderProps, ClassNameMap } from '../index';
import defaultIconVariants from '../utils/defaultIconVariants';
import createChainedFunction from '../utils/createChainedFunction';
import { Snack } from '../SnackbarProvider';
import Snackbar from './Snackbar';

const componentName = 'SnackbarItem';

const classes = {
    contentRoot: `${componentName}-contentRoot`,
    lessPadding: `${componentName}-lessPadding`,
    variantSuccess: `${componentName}-variantSuccess`,
    variantError: `${componentName}-variantError`,
    variantInfo: `${componentName}-variantInfo`,
    variantWarning: `${componentName}-variantWarning`,
    message: `${componentName}-message`,
    action: `${componentName}-action`,
    wrappedRoot: `${componentName}-wrappedRoot`,
};

const StyledSnackbar = styled(Snackbar)(({ theme }) => {
    const mode = theme.palette.mode;

    return {
        [`&.${classes.wrappedRoot}`]: {
            position: 'relative',
            transform: 'translateX(0)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        [`.${classes.contentRoot}`]: {
            ...theme.typography.body2,
            backgroundColor: emphasize(theme.palette.background.default, mode === 'light' ? 0.8 : 0.98),
            color: theme.palette.getContrastText(emphasize(theme.palette.background.default, mode === 'light' ? 0.8 : 0.98)),
            alignItems: 'center',
            padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
            borderRadius: '4px',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
        },
        [`.${classes.lessPadding}`]: {
            paddingLeft: theme.spacing(2.5),
        },
        [`.${classes.variantSuccess}`]: {
            backgroundColor: mode === "light" ? theme.palette.success.main : theme.palette.success.dark,
            color:  mode === "light" ? theme.palette.getContrastText(theme.palette.success.main) : theme.palette.getContrastText(theme.palette.success.dark),
        },
        [`.${classes.variantError}`]: {
            backgroundColor: mode === "light" ? theme.palette.error.main : theme.palette.error.dark,
            color:  mode === "light" ? theme.palette.getContrastText(theme.palette.error.main) : theme.palette.getContrastText(theme.palette.error.dark),
        },
        [`.${classes.variantInfo}`]: {
            backgroundColor: mode === "light" ? theme.palette.info.main : theme.palette.info.dark,
            color:  mode === "light" ? theme.palette.getContrastText(theme.palette.info.main) : theme.palette.getContrastText(theme.palette.info.dark),
        },
        [`.${classes.variantWarning}`]: {
            backgroundColor: mode === "light" ? theme.palette.warning.main : theme.palette.warning.dark,
            color:  mode === "light" ? theme.palette.getContrastText(theme.palette.warning.main) : theme.palette.getContrastText(theme.palette.warning.dark),
        },
        [`.${classes.message}`]: {
            display: 'flex',
            alignItems: 'center',
            padding: `${theme.spacing(1)} 0`,
        },
        [`.${classes.action}`]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingLeft: theme.spacing(2),
            marginRight: theme.spacing(-1),
        },
    };
});

type RemovedProps =
    | 'variant' // the one received from Provider is processed and passed to snack prop
    | 'anchorOrigin' // same as above
    | 'autoHideDuration' // same as above
    | 'preventDuplicate' // the one recevied from enqueueSnackbar is processed in provider, therefore shouldn't be passed to SnackbarItem */

export interface SnackbarItemProps extends RequiredBy<Omit<SharedProps, RemovedProps>, 'onEntered' | 'onExited' | 'onClose'> {
    snack: Snack;
    dense: ProviderProps['dense'];
    iconVariant: ProviderProps['iconVariant'];
    hideIconVariant: ProviderProps['hideIconVariant'];
    classes: Partial<ClassNameMap<SnackbarClassKey>>;
}

const SnackbarItem: React.FC<SnackbarItemProps> = ({ classes: propClasses, ...props }) => {
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

    // eslint-disable-next-line operator-linebreak
    const callbacks: { [key in keyof TransitionHandlerProps]?: any } =
        ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].reduce((acc, cbName) => ({
            ...acc,
            [cbName]: createChainedFunction([
                props.snack[cbName as keyof Snack],
                props[cbName as keyof SnackbarItemProps],
            ], props.snack.key),
        }), {});

    return (
        <Collapse
            unmountOnExit
            timeout={175}
            in={collapsed}
            onExited={callbacks.onExited}
        >
            <StyledSnackbar
                {...other}
                {...singleSnackProps}
                open={open}
                className={clsx(
                    propClasses.root,
                    classes.wrappedRoot,
                    propClasses[transformer.toAnchorOrigin(anchorOrigin)],
                )}
                onClose={handleClose}
            >
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
                                singleClassName,
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
            </StyledSnackbar>
        </Collapse>
    );
};

export default SnackbarItem;

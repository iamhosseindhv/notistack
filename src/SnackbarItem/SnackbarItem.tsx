import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { getTransitionDirection, omitNonCollapseKeys } from './SnackbarItem.util';
import { allClasses, REASONS, SNACKBAR_INDENTS, objectMerge, DEFAULTS, transformer } from '../utils/constants';
import { SharedProps, RequiredBy, TransitionHandlerProps, SnackbarProviderProps as ProviderProps } from '../index';
import defaultIconVariants from '../utils/defaultIconVariants';
import createChainedFunction from '../utils/createChainedFunction';
import { Snack } from '../SnackbarProvider';
import Snackbar from './Snackbar';

const styles = (theme: Theme) => createStyles({
    ...allClasses.mui,
    lessPadding: {
        paddingLeft: 8 * 2.5,
    },
    variantSuccess: {
        backgroundColor: '#43a047', // green
        color: '#fff',
    },
    variantError: {
        backgroundColor: '#d32f2f', // dark red
        color: '#fff',
    },
    variantInfo: {
        backgroundColor: '#2196f3', // nice blue
        color: '#fff',
    },
    variantWarning: {
        backgroundColor: '#ff9800', // amber
        color: '#fff',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    wrappedRoot: {
        position: 'relative',
        transform: 'translateX(0)',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
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


type RemovedProps =
    /** the one received from Provider is processed and passed to snack prop */
    | 'variant'
    /** same as above */
    | 'anchorOrigin'
    /** the one recevied from enqueueSnackbar is processed in provider, therefore shouldn't be passed to SnackbarItem */
    | 'preventDuplicate'


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
            handleClose(null, REASONS.MAXSNACK);
        }
    };

    const handleExitedScreen = (): void => {
        timeout.current = setTimeout(() => {
            setCollapsed(!collapsed);
        }, 125);
    };

    const {
        className,
        style,
        dense,
        hideIconVariant,
        iconVariant,
        snack,
        action: otherAction,
        content: otherContent,
        ContentProps: otherContentProps,
        TransitionComponent: otherTranComponent,
        TransitionProps: otherTranProps,
        transitionDuration: otherTranDuration,
        ...other
    } = props;

    const {
        persist,
        key,
        entered,
        requestClose,
        variant,
        anchorOrigin,
        message: snackMessage,
        action: singleAction,
        content: singleContent,
        ContentProps: singleContentProps,
        TransitionComponent: singleTranComponent,
        TransitionProps: singleTranProps,
        transitionDuration: singleTranDuration,
        ...singleSnackProps
    } = snack;

    const icon = {
        ...defaultIconVariants,
        ...iconVariant,
    }[variant];

    const contentProps = {
        'aria-describedby': 'notistack-snackbar',
        ...objectMerge(singleContentProps, otherContentProps),
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
            <Snackbar
                {...other}
                {...singleSnackProps}
                open={snack.open}
                className={clsx(
                    classes.root,
                    classes.wrappedRoot,
                    classes[transformer.toAnchorOrigin(anchorOrigin)],
                )}
                onClose={handleClose}
            >
                <TransitionComponent
                    appear
                    in={snack.open}
                    timeout={transitionDuration}
                    {...transitionProps}
                    onExit={callbacks.onExit}
                    onExiting={callbacks.onExiting}
                    onExited={handleExitedScreen}
                    onEnter={callbacks.onEnter}
                    onEntering={callbacks.onEntering}
                    onEntered={createChainedFunction([handleEntered, callbacks.onEntered], key)}
                >
                    {content || (
                        <SnackbarContent
                            role="alert"
                            {...contentProps}
                            className={clsx(
                                classes[transformer.toVariant(variant)],
                                { [classes.lessPadding]: !hideIconVariant && icon },
                                className,
                            )}
                            style={style}
                            action={action}
                            message={(
                                <span id={contentProps['aria-describedby']} className={classes.message}>
                                    {!hideIconVariant ? icon : null}
                                    {snackMessage}
                                </span>
                            )}
                        />
                    )}
                </TransitionComponent>
            </Snackbar>
        </Collapse>
    );
};

export default withStyles(styles)(SnackbarItem);

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { getTransitionDirection, omitNonCollapseKeys } from './SnackbarItem.util';
import { capitalise, allClasses, REASONS, SNACKBAR_INDENTS } from '../utils/constants';
import { SnackbarProviderProps, SharedProps, RequiredBy, VariantClassKey, TransitionHandlerProps } from '../index';
import defaultIconVariants from '../utils/defaultIconVariants';
import { Snack } from '../SnackbarProvider';
import Snackbar, { createChainedFunction } from './Snackbar';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
        zIndex: theme.zIndex.snackbar,
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
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
    dense: SnackbarProviderProps['dense'];
    iconVariant?: SnackbarProviderProps['iconVariant'];
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
            handleClose(null, REASONS.MAXSNACK);
        }
    };

    const handleExitedScreen = (): void => {
        timeout.current = setTimeout(() => {
            setCollapsed(!collapsed);
        }, 125);
    };

    const {
        action,
        content,
        ContentProps = {},
        hideIconVariant,
        iconVariant: iVariant,
        snack,
        dense,
        TransitionComponent = Slide,
        TransitionProps: otherTransitionProps = {},
        ...other
    } = props;

    const iconVariant = {
        ...defaultIconVariants,
        ...iVariant,
    };

    const { className, ...otherContentProps } = ContentProps;

    const {
        key,
        persist,
        entered,
        requestClose,
        variant,
        content: singleContent,
        action: singleAction,
        ContentProps: singleContentProps = {},
        anchorOrigin,
        TransitionProps: singleTransitionProps = {},
        ...singleSnackProps
    } = snack;

    const icon = iconVariant[variant];

    const contentProps = {
        ...otherContentProps,
        ...singleContentProps,
        action: singleAction || singleContentProps.action || otherContentProps.action || action,
    };

    const transitionProps = {
        direction: getTransitionDirection(anchorOrigin),
        ...otherTransitionProps,
        ...singleTransitionProps,
    };

    const ariaDescribedby = contentProps['aria-describedby'] || 'client-snackbar';

    let finalAction = contentProps.action;
    if (typeof finalAction === 'function') {
        finalAction = contentProps.action(key);
    }

    let snackContent = singleContent || content;
    if (snackContent && typeof snackContent === 'function') {
        snackContent = snackContent(key, snack.message);
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
                TransitionComponent={TransitionComponent}
                {...other}
                {...singleSnackProps}
                open={snack.open}
                anchorOrigin={anchorOrigin}
                TransitionProps={transitionProps}
                className={clsx(
                    classes.wrappedRoot,
                    // @ts-ignore
                    classes[`anchorOrigin${capitalise(anchorOrigin.vertical)}${capitalise(anchorOrigin.horizontal)}`],
                    // className, // FIXme get the right classname for this
                )}
                {...callbacks}
                onExited={handleExitedScreen}
                onEntered={createChainedFunction([handleEntered, callbacks.onEntered], key)}
                onClose={handleClose}
            >
                {snackContent || (
                    <SnackbarContent
                        className={clsx(
                            classes[`variant${capitalise(variant)}` as VariantClassKey],
                            { [classes.lessPadding]: !hideIconVariant && icon },
                            className,
                        )}
                        {...contentProps}
                        aria-describedby={ariaDescribedby}
                        message={(
                            <span id={ariaDescribedby} className={classes.message}>
                                {!hideIconVariant ? icon : null}
                                {snack.message}
                            </span>
                        )}
                        action={finalAction}
                    />
                )}
            </Snackbar>
        </Collapse>
    );
};

export default withStyles(styles)(SnackbarItem);

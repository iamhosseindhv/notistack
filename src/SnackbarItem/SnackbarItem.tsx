import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { getTransitionDirection, omitNonMuiKeys, omitNonCollapseKeys } from './SnackbarItem.util';
import { capitalise, allClasses, REASONS, SNACKBAR_INDENTS } from '../utils/constants';
import { SnackbarProviderProps, OptionalBy, SharedProps, RequiredBy, IconVariant, VariantClassKey, TransitionHandlerProps } from '../index';
import { Snack } from '../SnackbarProvider';
import createChainedFunction from '../utils/createChainedFunction';

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
            handleClose(null, REASONS.MAXSNACK);
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
        ContentProps = {},
        hideIconVariant,
        iconVariant,
        snack,
        dense,
        TransitionComponent = Slide,
        TransitionProps: otherTransitionProps = {},
        ...other
    } = props;

    const { action: contentAction, className, ...otherContentProps } = ContentProps;

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
        action: singleAction || singleContentProps.action || contentAction || action,
    };

    const transitionProps = {
        direction: getTransitionDirection(anchorOrigin),
        ...otherTransitionProps,
        ...singleTransitionProps,
        onExited: handleExitedScreen,
    };

    const ariaDescribedby = contentProps['aria-describedby'] || 'client-snackbar';

    let finalAction = contentProps.action;
    if (typeof finalAction === 'function') {
        // @ts-ignore
        finalAction = contentProps.action(key);
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
                onEntered={createChainedFunction([handleEntered, callbacks.onEntered])}
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

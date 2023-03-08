import React, { memo, forwardRef } from 'react';
import clsx from 'clsx';
import SnackbarContent from '../../SnackbarContent';
import { CustomContentProps } from '../../types';
import { ComponentClasses, makeStyles } from '../../utils/styles';

const classes = makeStyles({
    root: {
        backgroundColor: '#313131', // dark grey
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
        color: '#fff',
        alignItems: 'center',
        padding: '6px 16px',
        borderRadius: '4px',
        boxShadow:
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    },
    lessPadding: {
        paddingLeft: `${8 * 2.5}px`,
    },
    default: {
        backgroundColor: '#313131', // dark grey
    },
    success: {
        backgroundColor: '#43a047', // green
    },
    error: {
        backgroundColor: '#d32f2f', // dark red
    },
    warning: {
        backgroundColor: '#ff9800', // amber
    },
    info: {
        backgroundColor: '#2196f3', // nice blue
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
        paddingLeft: '16px',
        marginRight: '-8px',
    },
});

const ariaDescribedby = 'notistack-snackbar';

const MaterialDesignContent = forwardRef<HTMLDivElement, CustomContentProps>((props, forwardedRef) => {
    const {
        id,
        message,
        action: componentOrFunctionAction,
        iconVariant,
        variant,
        hideIconVariant,
        style,
        className,
    } = props;

    const icon = iconVariant[variant];

    let action = componentOrFunctionAction;
    if (typeof action === 'function') {
        action = action(id);
    }

    return (
        <SnackbarContent
            ref={forwardedRef}
            role="alert"
            aria-describedby={ariaDescribedby}
            style={style}
            className={clsx(
                ComponentClasses.MuiContent,
                ComponentClasses.MuiContentVariant(variant),
                classes.root,
                { [classes.lessPadding]: !hideIconVariant && icon },
                classes[variant],
                className
            )}
        >
            <div id={ariaDescribedby} className={classes.message}>
                {!hideIconVariant ? icon : null}
                {message}
            </div>
            {action && <div className={classes.action}>{action}</div>}
        </SnackbarContent>
    );
});

MaterialDesignContent.displayName = 'MaterialDesignContent';

export default memo(MaterialDesignContent);

import * as React from 'react';
import { TransitionActions } from 'react-transition-group/Transition';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { SnackbarProps } from '@material-ui/core/Snackbar';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface OptionsObject extends Omit<SnackbarProps, 'open'|'message'> {
    variant?: VariantType;
    onClickAction?: Function;
}

export interface InjectedNotistackProps {
    onPresentSnackbar: (variant: VariantType, message: string) => void;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

export function withSnackbar<P extends InjectedNotistackProps>(component: React.ComponentType<P>):
    React.ComponentClass<Omit<P, keyof InjectedNotistackProps>> & { WrappedComponent: React.ComponentType<P> };


export interface SnackbarProviderProps extends Omit<SnackbarProps, 'open'|'message'> {
    maxSnack: number;
    iconVariant?: React.ComponentType<SvgIconProps>;
    hideIconVariant?: boolean;
    onClickAction?: Function;
}

export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;

import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { SnackbarProps, SnackbarClassKey } from '@material-ui/core/Snackbar';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface OptionsObject extends Omit<SnackbarProps, 'open' | 'message' | 'classes'> {
    key?: string | number;
    variant?: VariantType;
    onClickAction?: Function;
    preventDuplicate?: boolean;
}

type NotistackClassKey = 'variantSuccess'
    | 'variantError'
    | 'variantInfo'
    | 'variantWarning';

// class keys for both MUI and notistack
export type CombinedClassKey = NotistackClassKey | SnackbarClassKey;

export interface InjectedNotistackProps {
    onPresentSnackbar: (variant: VariantType, message: string) => void;
    enqueueSnackbar: (message: string | React.ReactNode, options?: OptionsObject) => string | number | null;
    closeSnackbar: (key: string | number) => void
}

export function withSnackbar<P extends InjectedNotistackProps>(component: React.ComponentType<P>):
    React.ComponentClass<Omit<P, keyof InjectedNotistackProps>> & { WrappedComponent: React.ComponentType<P> };

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

/** all MUI props, including class keys for notistack and MUI with additional notistack props */
export interface SnackbarProviderProps
    extends Omit<SnackbarProps, 'open' | 'message' | 'classes'> {
    classes?: Partial<ClassNameMap<CombinedClassKey>>;
    maxSnack: number;
    iconVariant?: React.ComponentType<SvgIconProps>;
    hideIconVariant?: boolean;
    onClickAction?: Function;
    preventDuplicate?: boolean;
}

export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;

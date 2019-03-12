import * as React from 'react';
import { SnackbarProps, SnackbarClassKey } from '@material-ui/core/Snackbar';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface OptionsObject extends Omit<SnackbarProps, 'open' | 'message' | 'classes'> {
    key?: string | number;
    variant?: VariantType;
    persist?: boolean;
    onClickAction?: Function;
    preventDuplicate?: boolean;
}

export type NotistackClassKey = 'variantSuccess' | 'variantError' | 'variantInfo' | 'variantWarning';

type CombinedClassKey = NotistackClassKey | SnackbarClassKey;

export interface withSnackbarProps {
    onPresentSnackbar: (variant: VariantType, message: string) => void;
    enqueueSnackbar: (message: string | React.ReactNode, options?: OptionsObject) => string | number | null;
    closeSnackbar: (key: string | number) => void
}

export function withSnackbar<P extends withSnackbarProps>(component: React.ComponentType<P>):
    React.ComponentClass<Omit<P, keyof withSnackbarProps>> & { WrappedComponent: React.ComponentType<P> };

// all material-ui props, including class keys for notistack and material-ui with additional notistack props
export interface SnackbarProviderProps extends Omit<SnackbarProps, 'open' | 'message' | 'classes'> {
    classes?: Partial<ClassNameMap<CombinedClassKey>>;
    maxSnack?: number;
    iconVariant?: Partial<Record<VariantType, React.ReactNode>>;
    hideIconVariant?: boolean;
    onClickAction?: Function;
    preventDuplicate?: boolean;
    dense?: boolean;
}

export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;

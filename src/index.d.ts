import * as React from 'react';
import { SnackbarProps, SnackbarClassKey } from '@material-ui/core/Snackbar';
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface OptionsObject extends Omit<SnackbarProps, 'open' | 'message' | 'classes'> {
    key?: string | number;
    variant?: VariantType;
    persist?: boolean;
    preventDuplicate?: boolean;
    children?: React.ReactNode | ((key: OptionsObject['key']) => React.ReactNode);
    action?: SnackbarContentProps['action'] | ((key: OptionsObject['key']) => React.ReactNode);
}

export type NotistackClassKey = 'variantSuccess' | 'variantError' | 'variantInfo' | 'variantWarning';

type CombinedClassKey = NotistackClassKey | SnackbarClassKey;

export interface WithSnackbarProps {
    enqueueSnackbar: (message: string | React.ReactNode, options?: OptionsObject) => OptionsObject['key'] | null;
    closeSnackbar: (key?: OptionsObject['key']) => void;
}

export function withSnackbar<P extends WithSnackbarProps>(component: React.ComponentType<P>):
    React.ComponentClass<Omit<P, keyof WithSnackbarProps>> & { WrappedComponent: React.ComponentType<P> };


export function useSnackbar(): WithSnackbarProps;

// all material-ui props, including class keys for notistack and material-ui with additional notistack props
export interface SnackbarProviderProps extends Omit<SnackbarProps, 'open' | 'message' | 'classes'> {
    classes?: Partial<ClassNameMap<CombinedClassKey>>;
    maxSnack?: number;
    iconVariant?: Partial<Record<VariantType, React.ReactNode>>;
    hideIconVariant?: boolean;
    preventDuplicate?: boolean;
    dense?: boolean;
    action?: SnackbarContentProps['action'] | ((key: OptionsObject['key']) => React.ReactNode);
}

export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;

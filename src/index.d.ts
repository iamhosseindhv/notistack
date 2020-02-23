import * as React from 'react';
import { SnackbarProps, SnackbarClassKey } from '@material-ui/core/Snackbar';
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

type RemovedAttributes = 'open' | 'message' | 'classes';
export type SnackbarKey = string | number;
export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';

export type SnackbarMessage = string | React.ReactNode;
export type SnackbarAction = SnackbarContentProps['action'] | ((key: SnackbarKey) => React.ReactNode);
export type SnackbarContent = React.ReactNode | ((key: SnackbarKey, message: SnackbarMessage) => React.ReactNode);

export interface OptionsObject extends Omit<SnackbarProps, RemovedAttributes> {
    key?: SnackbarKey;
    variant?: VariantType;
    persist?: boolean;
    preventDuplicate?: boolean;
    children?: SnackbarContent; // To be deprecated
    content?: SnackbarContent;
    action?: SnackbarAction;
}

export type ContainerClassKey =
    | 'containerAnchorOriginTopCenter'
    | 'containerAnchorOriginBottomCenter'
    | 'containerAnchorOriginTopRight'
    | 'containerAnchorOriginBottomRight'
    | 'containerAnchorOriginTopLeft'
    | 'containerAnchorOriginBottomLeft';

export type VariantClassKey = 'variantSuccess' | 'variantError' | 'variantInfo' | 'variantWarning';
export type CombinedClassKey = VariantClassKey | ContainerClassKey | SnackbarClassKey;

export interface WithSnackbarProps {
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
}

export function withSnackbar<P extends WithSnackbarProps>(component: React.ComponentType<P>):
    React.ComponentClass<Omit<P, keyof WithSnackbarProps>> & { WrappedComponent: React.ComponentType<P> };


export function useSnackbar(): WithSnackbarProps;

// all material-ui props, including class keys for notistack and material-ui with additional notistack props
export interface SnackbarProviderProps extends Omit<SnackbarProps, RemovedAttributes> {
    classes?: Partial<ClassNameMap<CombinedClassKey>>;
    maxSnack?: number;
    iconVariant?: Partial<Record<VariantType, React.ReactNode>>;
    hideIconVariant?: boolean;
    preventDuplicate?: boolean;
    dense?: boolean;
    action?: SnackbarAction;
    content?: SnackbarContent;
    domRoot?: HTMLElement;
}

export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;

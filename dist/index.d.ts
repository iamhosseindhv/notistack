/**
 * Part of the following typing and documentation is from material-ui/src/Snackbar/Snackbar.d.ts
 */
import * as React from 'react';
import { SnackbarClassKey } from '@material-ui/core/Snackbar';
import { ClickAwayListenerProps } from '@material-ui/core/ClickAwayListener';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { StandardProps } from '@material-ui/core';

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R

export type SnackbarKey = string | number;
export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';
export type CloseReason = 'timeout' | 'clickaway' | 'maxsnack' | 'instructed';

export type SnackbarMessage = string | React.ReactNode;
export type SnackbarAction = React.ReactNode | ((key: SnackbarKey) => React.ReactNode);
export type SnackbarContentCallback = React.ReactNode | ((key: SnackbarKey, message: SnackbarMessage) => React.ReactNode);


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransitionCloseHandler = (event: React.SyntheticEvent<any> | null, reason: CloseReason, key?: SnackbarKey) => void;
export type TransitionEnterHandler = (node: HTMLElement, isAppearing: boolean, key: SnackbarKey) => void;
export type TransitionHandler = (node: HTMLElement, key: SnackbarKey) => void;

export type ContainerClassKey =
    | 'containerRoot'
    | 'containerAnchorOriginTopCenter'
    | 'containerAnchorOriginBottomCenter'
    | 'containerAnchorOriginTopRight'
    | 'containerAnchorOriginBottomRight'
    | 'containerAnchorOriginTopLeft'
    | 'containerAnchorOriginBottomLeft';

export type VariantClassKey = 'variantSuccess' | 'variantError' | 'variantInfo' | 'variantWarning';
export type CombinedClassKey = VariantClassKey | ContainerClassKey | SnackbarClassKey;

export interface SnackbarOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}

export interface IconVariant {
    /**
     * Icon displayed when variant of a snackbar is set to `default`.
     */
    default: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `error`.
     */
    error: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `success`.
     */
    success: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `warning`.
     */
    warning: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `info`.
     */
    info: React.ReactNode;
}

/**
 * @category Shared
 */
export interface TransitionHandlerProps {
    /**
     * Callback fired before snackbar requests to get closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`.
     *
     * @param {object} event The event source of the callback
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     *  or: `"maxsnack"` (snackbar was closed because `maxSnack` has reached) or: `"instructed"`
     * (snackbar was closed programmatically)
     * @param {string|number|undefined} key key of a Snackbar. key will be `undefined` if closeSnackbar
     * is called with no key (user requested all the snackbars to be closed)
     */
    onClose: TransitionCloseHandler;
    /**
     * Callback fired before the transition is entering.
     */
    onEnter: TransitionHandler;
    /**
     * Callback fired when the transition is entering.
     */
    onEntering: TransitionHandler;
    /**
     * Callback fired when the transition has entered.
     */
    onEntered: TransitionEnterHandler;
    /**
     * Callback fired before the transition is exiting.
     */
    onExit: TransitionHandler;
    /**
     * Callback fired when the transition is exiting.
     */
    onExiting: TransitionHandler;
    /**
     * Callback fired when the transition has exited.
     */
    onExited: TransitionHandler;
}

export type SnackbarContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @category Shared
 */
export interface SnackbarProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, SnackbarClassKey> {
    /**
     * The anchor of the `Snackbar`.
     * @default { horizontal: left, vertical: bottom }
     */
    anchorOrigin?: SnackbarOrigin;
    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. By default snackbars get closed after 5000 milliseconds.
     * Set autoHideDuration to 'null' if you don't want snackbars to automatically close.
     * Alternatively pass `persist: true` in the options parameter of enqueueSnackbar.
     * @default 5000
     */
    autoHideDuration?: number | null;
    /**
     * @ignore
     * Properties applied to ClickAwayListener component
     */
    ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
    /**
     * Aria attributes applied to snackbar's content component
     */
    ariaAttributes?: React.AriaAttributes;
    /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     * @default false
     */
    disableWindowBlurListener?: boolean;
    /**
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` property isn't specified, it does nothing.
     * If `autoHideDuration` property is specified but `resumeHideDuration` isn't,
     * we use the default value.
     * @default autoHideDuration / 2 ms.
     */
    resumeHideDuration?: number;
    /**
     * The component used for the transition. (e.g. Slide, Grow, Zoom, etc.)
     * @default Slide
     */
    TransitionComponent?: React.ComponentType<TransitionProps>;
    /**
     * The duration for the transition, in milliseconds.
     * You may specify the duration with an object in the following shape:
     * ```js
     * transitionDuration={{ enter: 300, exit: 500 }}
     * ```
     * @default { enter: 225, exit: 195 }
     */
    transitionDuration?: { appear?: number; enter?: number; exit?: number };
    /**
     * Properties applied to Transition component (e.g. Slide, Grow, Zoom, etc.)
     */
    TransitionProps?: TransitionProps;
}

/**
 * @category Shared
 */
export interface SharedProps extends Omit<SnackbarProps, 'classes'>, Partial<TransitionHandlerProps> {
    /**
     * Used to easily display different variant of snackbars. When passed to `SnackbarProvider`
     * all snackbars inherit the `variant`, unless you override it in `enqueueSnackbar` options.
     * @default default
     */
    variant?: VariantType;
    /**
     * Ignores displaying multiple snackbars with the same `message`
     * @default false
     */
    preventDuplicate?: boolean;
    /**
     * Replace the snackbar. Callback used for displaying entirely customized snackbar.
     * @param {string|number} key key of a snackbar
     */
    content?: SnackbarContentCallback;
    /**
     * Callback used for getting action(s). actions are mostly buttons displayed in Snackbar.
     * @param {string|number} key key of a snackbar
     */
    action?: SnackbarAction;
}

/**
 * @category Enqueue
 */
export interface OptionsObject extends SharedProps {
    /**
     * Unique identifier to reference a snackbar.
     * @default random unique string
     */
    key?: SnackbarKey;
    /**
     * Snackbar stays on the screen, unless it is dismissed (programmatically or through user interaction).
     * @default false
     */
    persist?: boolean;
}

/**
 * All material-ui props, including class keys for notistack and material-ui with additional notistack props
 * @category Provider
 */
export interface SnackbarProviderProps extends SharedProps {
    /**
     * Most of the time this is your App. every component from this point onward
     * will be able to show snackbars.
     */
    children: React.ReactNode | React.ReactNode[];
    /**
     * Denser margins for snackbars. Recommended to be used on mobile devices.
     * @default false
     */
    dense?: boolean;
    /**
     * Maximum snackbars that can be stacked on top of one another.
     * @default 3
     */
    maxSnack?: number;
    /**
     * Hides iconVariant if set to `true`.
     * @default false
     */
    hideIconVariant?: boolean;
    /**
     * Valid and exist HTML Node element, used to target `ReactDOM.createPortal`
     */
    domRoot?: HTMLElement;
    /**
     * Override or extend the styles applied to the container component or Snackbars.
     */
    classes?: Partial<ClassNameMap<CombinedClassKey>>;
    /**
     * Little icon that is displayed at left corner of a snackbar.
     */
    iconVariant?: Partial<IconVariant>;
    /**
     * @ignore
     * SnackbarProvider's ref
     */
    ref?: React.Ref<SnackbarProvider>;
}

export class SnackbarProvider extends React.Component<SnackbarProviderProps> {
    enqueueSnackbar: ProviderContext['enqueueSnackbar'];
    closeSnackbar: ProviderContext['closeSnackbar'];
}

export interface ProviderContext {
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
}

export function withSnackbar<P extends ProviderContext>(component: React.ComponentType<P>):
    React.ComponentClass<Omit<P, keyof ProviderContext>> & { WrappedComponent: React.ComponentType<P> };

export declare const SnackbarContent: React.ComponentType<SnackbarContentProps & React.RefAttributes<HTMLDivElement>>;

export function useSnackbar(): ProviderContext;

// backwards compatibility
export type WithSnackbarProps = ProviderContext;

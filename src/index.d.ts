/**
 * Part of the following typing and documentation is from material-ui/src/Snackbar/Snackbar.d.ts
 */
import * as React from 'react';
import { TransitionProps } from '@material-ui/core/transitions/transition';

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type SnackbarKey = string | number;
export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';
export type CloseReason = 'timeout' | 'clickaway' | 'maxsnack' | 'instructed';

export type SnackbarMessage = string | React.ReactNode;
export type SnackbarAction = React.ReactNode | ((key: SnackbarKey) => React.ReactNode);
export type SnackbarContentCallback = React.ReactNode | ((key: SnackbarKey, message: SnackbarMessage) => React.ReactNode);

export type TransitionCloseHandler = (event: React.SyntheticEvent<any> | null, reason: CloseReason, key?: SnackbarKey) => void;
export type TransitionEnterHandler = (node: HTMLElement, isAppearing: boolean, key: SnackbarKey) => void;
export type TransitionHandler = (node: HTMLElement, key: SnackbarKey) => void;

export type SnackbarClassKey =
    | 'root'
    | 'anchorOriginTopCenter'
    | 'anchorOriginBottomCenter'
    | 'anchorOriginTopRight'
    | 'anchorOriginBottomRight'
    | 'anchorOriginTopLeft'
    | 'anchorOriginBottomLeft';

export type ContainerClassKey =
    | 'containerRoot'
    | 'containerAnchorOriginTopCenter'
    | 'containerAnchorOriginBottomCenter'
    | 'containerAnchorOriginTopRight'
    | 'containerAnchorOriginBottomRight'
    | 'containerAnchorOriginTopLeft'
    | 'containerAnchorOriginBottomLeft';

export type CombinedClassKey = ContainerClassKey | SnackbarClassKey;

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
     * Callback fired when the transition has entered.
     */
    onEntered: TransitionEnterHandler;
    /**
     * Callback fired before the transition is exiting.
     */
    onExit: TransitionHandler;
    /**
     * Callback fired when the transition has exited.
     */
    onExited: TransitionHandler;
}

export type SnackbarContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @category Shared
 */
export interface SharedProps extends Partial<TransitionHandlerProps> {
    className?: string;
    style?: React.CSSProperties;
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
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     * @default false
     */
    disableWindowBlurListener?: boolean;
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
     * Callback used for getting action(s). actions are mostly buttons displayed in Snackbar.
     * @param {string|number} key key of a snackbar
     */
    action?: SnackbarAction;
    /**
     * Hides iconVariant if set to `true`.
     * @default false
     */
    hideIconVariant?: boolean;
    /** 
     * Properties applied to the Snackbar root element. You'd only want to use
     * this prop to apply html attributes for accessibility or data-* attributes.
     */
    SnackbarProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * Replace the snackbar. Callback used for displaying entirely customized snackbars.
     * @param {string|number} key key of a snackbar
     *
     * @ignore
     * @deprecated - Will be removed in future releases. You should use `Components` prop of
     * `SnackbarProvider` to display a custom snackbar. This is for your own benefit to have
     * more control over your custom snackbars.
     */
    content?: SnackbarContentCallback;
}

/**
 * @category Enqueue
 */
export interface OptionsObject extends SharedProps {
    /**
     * Unique identifier to reference a snackbar.
     * @default string random unique string
     */
    key?: SnackbarKey;
    /**
     * Snackbar stays on the screen, unless it is dismissed (programmatically or through user interaction).
     * @default false
     */
    persist?: boolean;
}

/** Properties of the internal snack which should not be exposed to outside world  */
interface InternalSnackAttributes {
    open: boolean;
    entered: boolean;
    requestClose: boolean;
}

type NeededByInternalSnack = 'variant' | 'anchorOrigin' | 'TransitionComponent' | 'TransitionProps' | 'transitionDuration' | 'hideIconVariant' | 'disableWindowBlurListener';

/**
 * Properties of a snackbar internal to notistack implementation. Not to be used by outside
 * world. If you find yourself using this, you're probably looking for `CustomContentProps` type.
 */
export interface InternalSnack extends RequiredBy<Omit<OptionsObject, 'key' | 'preventDuplicate'>, NeededByInternalSnack>, InternalSnackAttributes {
    id: SnackbarKey;
    message: SnackbarMessage;
    iconVariant: IconVariant;
}

type NotNeededByCustomSnackbar = keyof InternalSnackAttributes | 'disableWindowBlurListener' | 'TransitionComponent' | 'transitionDuration' | 'TransitionProps' | 'dense' | 'content';

/**
 * Props that will be passed to a custom component in `SnackbarProvider` `Components` prop
 */
export interface CustomContentProps extends Omit<InternalSnack, NotNeededByCustomSnackbar> {

}

/**
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
    /**
     * Mapping between variants and a custom component.
     */
    Components?: {
        [key in VariantType]?: React.ComponentType<CustomContentProps>;
    };
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

import * as React from 'react';

export interface TransitionDuration { enter?: number, exit?: number }

/**
 * @category Shared
 */
export interface TransitionHandlerProps {
    /**
     * Callback fired before the transition is entering.
     */
    onEnter: TransitionEnterHandler;
    /**
     * Callback fired when the transition has entered.
     */
    onEntered: TransitionEnterHandler;
    /**
     * Callback fired before the transition is exiting.
     */
    onExit: TransitionExitHandler;
    /**
     * Callback fired when the transition has exited.
     */
    onExited: TransitionExitHandler;
}

export type SlideTransitionDirection = 'down' | 'left' | 'right' | 'up';

export interface TransitionProps extends Partial<TransitionHandlerProps> {
    /**
     * Id/key of the snackbar this transition belongs to. Used in transition callbacks
     * (e.g. onExited) to identify which snackbar has exited.
     */
    id: SnackbarKey;
    /**
     * Show the component; triggers the enter or exit states
     */
    in?: boolean;
    /**
     * The duration of the transition, in milliseconds
     */
    timeout?: number | TransitionDuration | 'auto';
    /**
     * Enable or disable enter transitions.
     */
    enter?: boolean;
    /**
     * Enable or disable exit transitions.
     */
    exit?: boolean;
    /**
     * By default the child component is mounted immediately along with the
     * parent Transition component. If you want to "lazy mount" the component on
     * the first `in={true}` you can set `mountOnEnter`. After the first enter
     * transition the component will stay mounted, even on "exited", unless you
     * also specify `unmountOnExit`.
     */
    mountOnEnter?: boolean;
    /**
     * By default the child component stays mounted after it reaches the
     * 'exited' state. Set `unmountOnExit` if you'd prefer to unmount the
     * component after it finishes exiting.
     */
    unmountOnExit?: boolean;
    /**
     * Can be used to apply a custom `transitionTimingFunction` (e.g. your own easing),
     * `transitionDuration` and `transitionDelay`.
     */
    style?: React.CSSProperties;
    /**
     * The direction in which a snackbar slides into the screen.
     * Only applicable if `TransitionComponent` is Slide
     */
    direction?: SlideTransitionDirection;
    children: React.ReactNode;
}

type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type SnackbarKey = string | number;
export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';
export type CloseReason = 'timeout' | 'clickaway' | 'maxsnack' | 'instructed';

export type SnackbarMessage = string;
export type SnackbarAction = React.ReactNode | ((key: SnackbarKey) => React.ReactNode);
export type SnackbarContentCallback = React.ReactNode | ((key: SnackbarKey, message?: SnackbarMessage) => React.ReactNode);

export type TransitionCloseHandler = (event: React.SyntheticEvent<any> | null, reason: CloseReason, key?: SnackbarKey) => void;
export type TransitionEnterHandler = (node: HTMLElement, isAppearing: boolean, key: SnackbarKey) => void;
export type TransitionExitHandler = (node: HTMLElement, key: SnackbarKey) => void;

type AnyComponentMap = Record<string, React.ComponentType<any>>;
type VariantsOf<T> = { [K in keyof T]: K extends string ? K : never; }[keyof T];

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

export type SnackbarContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @category Shared
 */
export interface SharedProps<V extends string = VariantType> extends Partial<TransitionHandlerProps> {
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
     * The component used for the transition. notistack supports 4 transitions
     * out of the box. You can also create your own transitions using react-transition-group.
     * ```jsx
     * import Fade from 'notistack/transitions/Fade';
     * import Grow from 'notistack/transitions/Grow';
     * import Slide from 'notistack/transitions/Slide';
     * import Zoom from 'notistack/transitions/Zoom';
     * ```
     * @default Slide
     */
    TransitionComponent?: React.ComponentType<TransitionProps>;
    /**
     * The duration for the transition, in milliseconds.
     *
     * You may specify a single timeout for both enter and exit transitions:
     * ```js
     * timeout={500}
     * ```
     * or individually:
     * ```js
     * timeout={{ enter: 300, exit: 500 }}
     * ```
     * or auto-adjust based on dimensions of the snackbar (Only applicable if TransitionComponent is Grow)
     * ```js
     * transitionDuration="auto"
     * ```
     * @default { enter: 225, exit: 195 }
     */
    transitionDuration?: TransitionProps['timeout'];
    /**
     * Properties applied to Transition component
     */
    TransitionProps?: Partial<TransitionProps>;
    /**
     * Used to easily display different variant of snackbars. When passed to `SnackbarProvider`
     * all snackbars inherit the `variant`, unless you override it in `enqueueSnackbar` options.
     * @default default
     */
    variant?: V | VariantType;
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
    onClose?: TransitionCloseHandler;
}

/**
 * @category Enqueue
 */
export interface OptionsObject<V extends string = VariantType> extends SharedProps<V> {
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

type NeededByInternalSnack = 'style' | 'persist' | 'variant' | 'anchorOrigin' | 'TransitionComponent' | 'TransitionProps' | 'transitionDuration' | 'hideIconVariant' | 'disableWindowBlurListener';

/**
 * Properties of a snackbar internal to notistack implementation. Not to be used by outside
 * world. If you find yourself using this, you're probably looking for `CustomContentProps` type.
 */
export interface InternalSnack<V extends string = VariantType> extends RequiredBy<Omit<OptionsObject<V>, 'key' | 'preventDuplicate'>, NeededByInternalSnack>, InternalSnackAttributes {
    id: SnackbarKey;
    message?: SnackbarMessage;
    iconVariant: Record<string, React.ReactNode>;
}

type NotNeededByCustomSnackbar = keyof InternalSnackAttributes | keyof TransitionHandlerProps | 'onClose' | 'SnackbarProps' | 'disableWindowBlurListener' | 'TransitionComponent' | 'transitionDuration' | 'TransitionProps' | 'dense' | 'content';

/**
 * Props that will be passed to a custom component in `SnackbarProvider` `Components` prop
 */
export type CustomContentProps<V extends string = VariantType> = Omit<InternalSnack<V>, NotNeededByCustomSnackbar>

/**
 * @category Provider
 */
export interface SnackbarProviderProps<V extends keyof T = any, T extends Record<V, React.ComponentType<any>> = any> extends SharedProps<VariantsOf<T>> {
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
     * Mapping between variants and an icon component
     */
    iconVariant?: Partial<Record<V, React.ReactNode>>;
    /**
     * @ignore
     * SnackbarProvider's ref
     */
    ref?: React.Ref<SnackbarProvider<any, any>>;
    /**
     * Mapping between variants and a custom component.
     */
    Components?: T;
}

/** All additional props (custom content props excluded (except message)) */
type AdditionalProps<P extends CustomContentProps> = Omit<P, keyof CustomContentProps>;
/** Infers type of props passed to a custom component */
type PropsOfComponent<C> = C extends React.ComponentType<infer P> ? P : never;
type AdditionalPropsOfComponent<C extends React.ComponentType<any>> = AdditionalProps<PropsOfComponent<C>>

interface EnqueueSnackbar<T extends AnyComponentMap> {
    <V extends VariantsOf<T>>(options: OptionsObject<V> & AdditionalPropsOfComponent<T[V]> & { message?: SnackbarMessage }): SnackbarKey
    <V extends VariantsOf<T>>(message: string, options?: OptionsObject<V> & AdditionalPropsOfComponent<T[V]>): SnackbarKey;
}

export interface ProviderContext<T extends AnyComponentMap = any> {
    enqueueSnackbar: EnqueueSnackbar<T>;
    closeSnackbar: (key?: SnackbarKey) => void;
}

export declare class SnackbarProvider<V extends keyof T, T extends Record<V, React.ComponentType<any>>> extends React.Component<SnackbarProviderProps<V, T>> {
    enqueueSnackbar: ProviderContext<T>['enqueueSnackbar'];

    closeSnackbar: ProviderContext<T>['closeSnackbar'];
}

export declare function withSnackbar<P extends ProviderContext>(component: React.ComponentType<P>):
    React.ComponentClass<Omit<P, keyof ProviderContext>> & { WrappedComponent: React.ComponentType<P> };

export declare const SnackbarContent: React.ComponentType<SnackbarContentProps & React.RefAttributes<HTMLDivElement>>;

export declare function useSnackbar<T extends AnyComponentMap>(): ProviderContext<T>;

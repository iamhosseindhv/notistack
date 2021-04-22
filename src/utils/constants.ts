import Slide from '@material-ui/core/Slide';
import { CloseReason, ContainerClassKey, VariantType, SnackbarOrigin, SnackbarClassKey, ClassNameMap, CombinedClassKey, InternalSnack } from '../index';
import { SnackbarItemProps } from '../SnackbarItem';
import defaultIconVariants from './defaultIconVariants';

export const breakpoints = {
    downXs: '@media (max-width:599.95px)',
    upSm: '@media (min-width:600px)',
}

export const MESSAGES = {
    NO_PERSIST_ALL: 'WARNING - notistack: Reached maxSnack while all enqueued snackbars have \'persist\' flag. Notistack will dismiss the oldest snackbar anyway to allow other ones in the queue to be presented.',
};

export const SNACKBAR_INDENTS = {
    view: { default: 20, dense: 4 },
    snackbar: { default: 6, dense: 2 },
};

export const DEFAULTS = {
    maxSnack: 3,
    hideIconVariant: false,
    disableWindowBlurListener: false,
    variant: 'default' as VariantType,
    autoHideDuration: 5000,
    iconVariant: defaultIconVariants,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' } as SnackbarOrigin,
    TransitionComponent: Slide,
    transitionDuration: {
        enter: 225,
        exit: 195,
    },
};

export const capitalise = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const originKeyExtractor = (anchor: InternalSnack['anchorOrigin']): string => (
    `${capitalise(anchor.vertical)}${capitalise(anchor.horizontal)}`
);

/**
 * Omit SnackbarContainer class keys that are not needed for SnackbarItem
 */
export const omitContainerKeys = (classes: Partial<ClassNameMap<CombinedClassKey>>): SnackbarItemProps['classes'] => {
    const containerClasses: ClassNameMap<ContainerClassKey> = {
        containerRoot: '',
        containerAnchorOriginTopCenter: '',
        containerAnchorOriginBottomCenter: '',
        containerAnchorOriginTopRight: '',
        containerAnchorOriginBottomRight: '',
        containerAnchorOriginTopLeft: '',
        containerAnchorOriginBottomLeft: '',
    };
    return (Object.keys(classes) as ContainerClassKey[])
        .filter(key => !containerClasses[key])
        .reduce((obj, key) => ({ ...obj, [key]: classes[key] }), {})
};

export const REASONS: { [key: string]: CloseReason } = {
    TIMEOUT: 'timeout',
    CLICKAWAY: 'clickaway',
    MAXSNACK: 'maxsnack',
    INSTRUCTED: 'instructed',
};

/** Tranforms classes name */
export const transformer = {
    toContainerAnchorOrigin: (origin: string) => `containerAnchorOrigin${origin}` as ContainerClassKey,
    toSnackbarAnchorOrigin: ({ vertical, horizontal }: SnackbarOrigin) => (
        `anchorOrigin${capitalise(vertical)}${capitalise(horizontal)}` as SnackbarClassKey
    ),
};

export const isDefined = (value: string | null | undefined | number): boolean => (!!value || value === 0);

const numberOrNull = (numberish?: number | null) => (
    typeof numberish === 'number' || numberish === null
);

// @ts-ignore
export const merge = (options, props, defaults) => (name: keyof InternalSnack, shouldObjectMerge = false): any => {
    if (shouldObjectMerge) {
        return {
            ...defaults[name],
            ...props[name],
            ...options[name],
        };
    }

    if (name === 'autoHideDuration') {
        if (numberOrNull(options.autoHideDuration)) return options.autoHideDuration;
        if (numberOrNull(props.autoHideDuration)) return props.autoHideDuration;
        return DEFAULTS.autoHideDuration;
    }

    return options[name] || props[name] || defaults[name];
};

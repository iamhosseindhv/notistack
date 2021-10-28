import { CloseReason as CloseReasonType, VariantType, InternalSnack } from '../types';
import defaultIconVariants from './defaultIconVariants';
import Slide from '../transitions/Slide';

export const breakpoints = {
    downXs: '@media (max-width:599.95px)',
    upSm: '@media (min-width:600px)',
};

export const MESSAGES = {
    NO_PERSIST_ALL: 'WARNING - notistack: Reached maxSnack while all enqueued snackbars have \'persist\' flag. Notistack will dismiss the oldest snackbar anyway to allow other ones in the queue to be presented.',
};

export const DEFAULTS = {
    maxSnack: 3,
    persist: false,
    hideIconVariant: false,
    disableWindowBlurListener: false,
    variant: 'default' as VariantType,
    autoHideDuration: 5000,
    iconVariant: defaultIconVariants,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
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

export const CloseReason: Record<string, CloseReasonType> = {
    Timeout: 'timeout',
    ClickAway: 'clickaway',
    MaxSnack: 'maxsnack',
    Instructed: 'instructed',
};

export const isDefined = (value: string | null | undefined | number): boolean => (!!value || value === 0);

const numberOrNull = (numberish: number | null) => (
    typeof numberish === 'number' || numberish === null
);

export const merge = (options, props) => (name: keyof InternalSnack, shouldObjectMerge = false): any => {
    if (shouldObjectMerge) {
        return {
            ...DEFAULTS[name],
            ...props[name],
            ...options[name],
        };
    }

    if (name === 'autoHideDuration') {
        if (numberOrNull(options.autoHideDuration)) return options.autoHideDuration;
        if (numberOrNull(props.autoHideDuration)) return props.autoHideDuration;
        return DEFAULTS.autoHideDuration;
    }

    if (name === 'transitionDuration') {
        if (typeof options.transitionDuration === 'string' || typeof options.transitionDuration === 'number') {
            return options.transitionDuration;
        }
        if (typeof options.transitionDuration === 'object') {
            return {
                ...DEFAULTS.transitionDuration,
                ...(typeof props.transitionDuration === 'object' && props.transitionDuration),
                ...options.transitionDuration,
            };
        }
        if (typeof props.transitionDuration === 'string' || typeof props.transitionDuration === 'number') {
            return props.transitionDuration;
        }
        if (typeof props.transitionDuration === 'object') {
            return {
                ...DEFAULTS.transitionDuration,
                ...props.transitionDuration,
            };
        }
        return DEFAULTS.transitionDuration;
    }

    return options[name] || props[name] || DEFAULTS[name];
};

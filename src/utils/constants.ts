import { InternalSnack } from '../types';
import defaultIconVariants from './defaultIconVariants';
import Slide from '../transitions/Slide';

export const breakpoints = {
    downXs: '@media (max-width:599.95px)',
    upSm: '@media (min-width:600px)',
};

export const DEFAULTS = {
    maxSnack: 3,
    persist: false,
    hideIconVariant: false,
    disableWindowBlurListener: false,
    variant: 'default',
    autoHideDuration: 5000,
    iconVariant: defaultIconVariants,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    TransitionComponent: Slide,
    transitionDuration: {
        enter: 225,
        exit: 195,
    },
};

const capitalise = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const originKeyExtractor = (anchor: InternalSnack['anchorOrigin']): string => (
    `${capitalise(anchor.vertical)}${capitalise(anchor.horizontal)}`
);

export const isDefined = (value: string | null | undefined | number): boolean => (!!value || value === 0);

/**
 * Derives the right autoHideDuration taking into account the following
 * prority order: 1: Options, 2: Props, 3: default fallback
 */
const getAutoHideDuration = (optionsDuration: any, propsDuration: any) => {
    const isNumberOrNull = (numberish: number | null) => typeof numberish === 'number' || numberish === null;

    if (isNumberOrNull(optionsDuration)) return optionsDuration;
    if (isNumberOrNull(propsDuration)) return propsDuration;
    return DEFAULTS.autoHideDuration;
};

/**
 * Derives the right transitionDuration taking into account the following
 * prority order: 1: Options, 2: Props, 3: default fallback
 */
const getTransitionDuration = (optionsDuration: any, propsDuration: any) => {
    const is = (item: any, types: string[]) => types.some((t) => typeof item === t);

    if (is(optionsDuration, ['string', 'number'])) {
        return optionsDuration;
    }

    if (is(optionsDuration, ['object'])) {
        return {
            ...DEFAULTS.transitionDuration,
            ...(is(propsDuration, ['object']) && propsDuration),
            ...optionsDuration,
        };
    }

    if (is(propsDuration, ['string', 'number'])) {
        return propsDuration;
    }

    if (is(propsDuration, ['object'])) {
        return {
            ...DEFAULTS.transitionDuration,
            ...propsDuration,
        };
    }

    return DEFAULTS.transitionDuration;
};

export const merge = (options, props) => (name: keyof InternalSnack, shouldObjectMerge = false): any => {
    if (shouldObjectMerge) {
        return {
            ...DEFAULTS[name],
            ...props[name],
            ...options[name],
        };
    }

    if (name === 'autoHideDuration') {
        return getAutoHideDuration(options.autoHideDuration, props.autoHideDuration);
    }

    if (name === 'transitionDuration') {
        return getTransitionDuration(options.transitionDuration, props.transitionDuration);
    }

    return options[name] || props[name] || DEFAULTS[name];
};

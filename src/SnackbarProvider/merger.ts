import Slide from '../transitions/Slide';
import defaultIconVariants from '../utils/defaultIconVariants';
import { InternalSnack } from '../types';

export const defaults = {
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

/**
 * Derives the right autoHideDuration taking into account the following
 * prority order: 1: Options, 2: Props, 3: default fallback
 */
const getAutoHideDuration = (optionsDuration: any, propsDuration: any) => {
    const isNumberOrNull = (numberish: number | null) => typeof numberish === 'number' || numberish === null;

    if (isNumberOrNull(optionsDuration)) return optionsDuration;
    if (isNumberOrNull(propsDuration)) return propsDuration;
    return defaults.autoHideDuration;
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
            ...defaults.transitionDuration,
            ...(is(propsDuration, ['object']) && propsDuration),
            ...optionsDuration,
        };
    }

    if (is(propsDuration, ['string', 'number'])) {
        return propsDuration;
    }

    if (is(propsDuration, ['object'])) {
        return {
            ...defaults.transitionDuration,
            ...propsDuration,
        };
    }

    return defaults.transitionDuration;
};

export const merge =
    (options: any, props: any) =>
    (name: keyof InternalSnack, shouldObjectMerge = false): any => {
        if (shouldObjectMerge) {
            return {
                ...(defaults as any)[name],
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

        return options[name] || props[name] || (defaults as any)[name];
    };

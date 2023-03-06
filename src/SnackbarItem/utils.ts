import {
    InternalSnack,
    SlideTransitionDirection,
    SnackbarOrigin,
    SnackbarClassKey,
    SnackbarProviderProps,
    ClassNameMap,
    ContainerClassKey,
} from '../types';
import { originKeyExtractor } from '../utils';

const direction: Record<string, SlideTransitionDirection> = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
};

export const getSlideDirection = (anchorOrigin: InternalSnack['anchorOrigin']): SlideTransitionDirection => {
    if (anchorOrigin.horizontal !== 'center') {
        return direction[anchorOrigin.horizontal];
    }
    return direction[anchorOrigin.vertical];
};

/** Tranforms classes name */
export const toSnackbarAnchorOrigin = (anchorOrigin: SnackbarOrigin): SnackbarClassKey =>
    `anchorOrigin${originKeyExtractor(anchorOrigin)}` as SnackbarClassKey;

/**
 * Omit SnackbarContainer class keys that are not needed for SnackbarItem
 */
export const keepSnackbarClassKeys = (
    classes: SnackbarProviderProps['classes'] = {}
): Partial<ClassNameMap<SnackbarClassKey>> => {
    const containerClasses: Record<ContainerClassKey, true> = {
        containerRoot: true,
        containerAnchorOriginTopCenter: true,
        containerAnchorOriginBottomCenter: true,
        containerAnchorOriginTopRight: true,
        containerAnchorOriginBottomRight: true,
        containerAnchorOriginTopLeft: true,
        containerAnchorOriginBottomLeft: true,
    };
    return (Object.keys(classes) as ContainerClassKey[])
        .filter((key) => !containerClasses[key])
        .reduce((obj, key) => ({ ...obj, [key]: classes[key] }), {});
};

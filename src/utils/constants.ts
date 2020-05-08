import { SnackbarClassKey } from '@material-ui/core/Snackbar';
import { CloseReason, ContainerClassKey, SnackbarProviderProps } from '../index';
import { SnackbarItemProps } from '../SnackbarItem';
import { Snack } from '../SnackbarProvider';

export const allClasses: {
    mui: Record<SnackbarClassKey, {}>;
    container: Record<ContainerClassKey, {}>;
} = {
    mui: {
        root: {},
        anchorOriginTopCenter: {},
        anchorOriginBottomCenter: {},
        anchorOriginTopRight: {},
        anchorOriginBottomRight: {},
        anchorOriginTopLeft: {},
        anchorOriginBottomLeft: {},
    },
    container: {
        containerAnchorOriginTopCenter: {},
        containerAnchorOriginBottomCenter: {},
        containerAnchorOriginTopRight: {},
        containerAnchorOriginBottomRight: {},
        containerAnchorOriginTopLeft: {},
        containerAnchorOriginBottomLeft: {},
    },
};

export const MESSAGES = {
    NO_PERSIST_ALL: 'WARNING - notistack: Reached maxSnack while all enqueued snackbars have \'persist\' flag. Notistack will dismiss the oldest snackbar anyway to allow other ones in the queue to be presented.',
};

export const SNACKBAR_INDENTS = {
    view: { default: 20, dense: 4 },
    snackbar: { default: 6, dense: 2 },
};

export const capitalise = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const originKeyExtractor = (anchor: Snack['anchorOrigin']): string => (
    `${capitalise(anchor.vertical)}${capitalise(anchor.horizontal)}`
);

/**
 * Omit SnackbarContainer class keys that are not needed for SnackbarItem
 */
export const omitContainerKeys = (classes: SnackbarProviderProps['classes'] = {}): SnackbarItemProps['classes'] => (
    // @ts-ignore
    Object.keys(classes).filter(key => !allClasses.container[key]).reduce((obj, key) => ({ ...obj, [key]: classes[key] }), {})
);

export const REASONS: { [key: string]: CloseReason } = {
    CLICKAWAY: 'clickaway',
    MAXSNACK: 'maxsnack',
    INSTRUCTED: 'instructed',
};

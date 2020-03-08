import classNames from 'classnames';
import { SnackbarProps } from '@material-ui/core/Snackbar';
import { allClasses } from '../utils/constants';
import { SnackbarItemProps } from './SnackbarItem';
import { Snack } from '../SnackbarProvider';

const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
} as const;
export type DirectionType = typeof DIRECTION[keyof typeof DIRECTION]

export const getTransitionDirection = (anchorOrigin: Snack['anchorOrigin']): DirectionType => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

/**
 * Omit all class keys except those allowed in material-ui snackbar
 */
export const omitNonMuiKeys: (classes: { wrappedRoot: string } & SnackbarProps['classes']) => SnackbarProps['classes'] = (classes) => {
    const snackbarMuiClasses = Object.keys(classes)
        // @ts-ignore
        .filter(key => allClasses.mui[key] !== undefined).reduce((obj, key) => ({ ...obj, [key]: classes[key] }), {});

    return {
        ...snackbarMuiClasses,
        root: classNames(classes.root, classes.wrappedRoot),
    };
};

/**
 * Omit all class keys except what we need for collapse component
 */
export const omitNonCollapseKeys = (classes: { collapseContainer: string; collapseWrapper: string; collapseWrapperDense: string }, dense: SnackbarItemProps['dense']): { container: string; wrapper: string } => ({
    container: classes.collapseContainer,
    wrapper: classNames(classes.collapseWrapper, { [classes.collapseWrapperDense]: dense }),
});

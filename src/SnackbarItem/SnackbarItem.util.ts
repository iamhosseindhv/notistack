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

import { InternalSnack } from '../index';

const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
} as const;

type DirectionType = typeof DIRECTION[keyof typeof DIRECTION]

export const getTransitionDirection = (anchorOrigin: InternalSnack['anchorOrigin']): DirectionType => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

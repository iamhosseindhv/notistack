import { InternalSnack } from '../types';

const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
} as const;

type DirectionType = typeof DIRECTION[keyof typeof DIRECTION]

// eslint-disable-next-line import/prefer-default-export
export const getTransitionDirection = (anchorOrigin: InternalSnack['anchorOrigin']): DirectionType => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

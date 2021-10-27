import { InternalSnack, SlideTransitionDirection } from '../types';

const direction: Record<string, SlideTransitionDirection> = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
};

// eslint-disable-next-line import/prefer-default-export
export const getTransitionDirection = (anchorOrigin: InternalSnack['anchorOrigin']): SlideTransitionDirection => {
    if (anchorOrigin.horizontal !== 'center') {
        return direction[anchorOrigin.horizontal];
    }
    return direction[anchorOrigin.vertical];
};

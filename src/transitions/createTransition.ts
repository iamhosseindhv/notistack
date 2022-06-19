import { defaultEasing } from './utils';

interface CreateTransitionOptions {
    duration: string | number;
    easing?: string;
    delay?: string | number;
}

const formatMs = (milliseconds: number) => `${Math.round(milliseconds)}ms`;

export default function createTransition(
    props: string | string[] = ['all'],
    options?: CreateTransitionOptions
): string {
    const { duration = 300, easing = defaultEasing.easeInOut, delay = 0 } = options || {};

    const properties = Array.isArray(props) ? props : [props];

    return properties
        .map((animatedProp) => {
            const formattedDuration = typeof duration === 'string' ? duration : formatMs(duration);
            const formattedDelay = typeof delay === 'string' ? delay : formatMs(delay);
            return `${animatedProp} ${formattedDuration} ${easing} ${formattedDelay}`;
        })
        .join(',');
}

import { TransitionDuration } from '../types';

interface ComponentProps {
    style?: React.CSSProperties | undefined;
    /**
     * number: 400
     * TransitionDuration: { enter: 200, exit: 400 }
     */
    timeout: number | TransitionDuration;
    mode: 'enter' | 'exit';
}

interface TransitionPropsReturnType {
    duration: number;
    easing: string | undefined;
    delay: string | undefined;
}

export default function getTransitionProps(props: ComponentProps): TransitionPropsReturnType {
    const { timeout, style = {}, mode } = props;
    return {
        duration: typeof timeout === 'object' ? timeout[mode] || 0 : timeout,
        easing: style.transitionTimingFunction,
        delay: style.transitionDelay,
    };
}

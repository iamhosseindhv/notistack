import { InternalSnack } from '../types';

export const breakpoints = {
    downXs: '@media (max-width:599.95px)',
    upSm: '@media (min-width:600px)',
};

const capitalise = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const originKeyExtractor = (anchor: InternalSnack['anchorOrigin']): string =>
    `${capitalise(anchor.vertical)}${capitalise(anchor.horizontal)}`;

export const isDefined = (value: string | null | undefined | number): boolean => !!value || value === 0;

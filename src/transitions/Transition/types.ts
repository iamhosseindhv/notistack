import { ENTERING, ENTERED, EXITING, EXITED, UNMOUNTED } from './index';

export type TransitionStatus = typeof ENTERING | typeof ENTERED | typeof EXITING | typeof EXITED | typeof UNMOUNTED;

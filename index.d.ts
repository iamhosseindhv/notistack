// Type definitions

import * as React from "react";
import { TransitionActions } from "react-transition-group/Transition";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

export type MessageType = "error" | "success" | "warning" | "info"

export interface InjectedNotistackProps {
  onPresentSnackbar: (variant: MessageType, message: string) => void;
}

export function withSnackbar<P extends InjectedNotistackProps>(component: React.ComponentType<P>):
  React.ComponentClass<Pick<P, Exclude<keyof P, keyof InjectedNotistackProps>>> & { WrappedComponent: React.ComponentType<P> };

export interface SnackbarProviderProps {
  maxSnack: number;
  iconVariant?: React.ComponentType<SvgIconProps>;
  transitionDuration?: number | { enter?: number, exit?: number };
}

export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;
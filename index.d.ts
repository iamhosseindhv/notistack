// Type definitions

import * as React from "react";
import { TransitionActions } from "react-transition-group/Transition";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { SnackbarProps } from "@material-ui/core/Snackbar"

export type MessageType = "error" | "success" | "warning" | "info"

export interface InjectedNotistackProps {
  onPresentSnackbar: (variant: MessageType, message: string) => void;
}

export function withSnackbar<P extends InjectedNotistackProps>(component: React.ComponentType<P>):
  React.ComponentClass<Pick<P, Exclude<keyof P, keyof InjectedNotistackProps>>> & { WrappedComponent: React.ComponentType<P> };

export interface SnackbarProviderProps extends SnackbarProps {
  maxSnack: number;
  iconVariant?: React.ComponentType<SvgIconProps>;
}

export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;
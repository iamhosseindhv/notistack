/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2018, React Community
 * Forked from React (https://github.com/facebook/react) Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import React from 'react';
import { TransitionComponentProps, TransitionStatus } from '../../types';

const UNMOUNTED = 'unmounted';
const EXITED = 'exited';
const ENTERING = 'entering';
const ENTERED = 'entered';
const EXITING = 'exiting';

interface State {
    status: TransitionStatus;
}

interface NextCallback {
    (): void;
    cancel?: () => void;
}

class Transition extends React.Component<TransitionComponentProps, State> {
    appearStatus: TransitionStatus | null;

    nextCallback: NextCallback | null;

    constructor(props: TransitionComponentProps) {
        super(props);

        const { appear } = props;

        let initialStatus: TransitionStatus;

        this.appearStatus = null;

        if (props.in) {
            if (appear) {
                initialStatus = EXITED;
                this.appearStatus = ENTERING;
            } else {
                initialStatus = ENTERED;
            }
        } else if (props.unmountOnExit || props.mountOnEnter) {
            initialStatus = UNMOUNTED;
        } else {
            initialStatus = EXITED;
        }

        this.state = { status: initialStatus };

        this.nextCallback = null;
    }

    static getDerivedStateFromProps({ in: nextIn }: TransitionComponentProps, prevState: State) {
        if (nextIn && prevState.status === UNMOUNTED) {
            return { status: EXITED };
        }
        return null;
    }

    componentDidMount() {
        this.updateStatus(true, this.appearStatus);
    }

    componentDidUpdate(prevProps: TransitionComponentProps) {
        let nextStatus: TransitionStatus | null = null;
        if (prevProps !== this.props) {
            const { status } = this.state;

            if (this.props.in) {
                if (status !== ENTERING && status !== ENTERED) {
                    nextStatus = ENTERING;
                }
            } else if (status === ENTERING || status === ENTERED) {
                nextStatus = EXITING;
            }
        }
        this.updateStatus(false, nextStatus);
    }

    componentWillUnmount() {
        this.cancelNextCallback();
    }

    getTimeouts(): { exit: number; enter: number } {
        const { timeout } = this.props;
        let enter = timeout;
        let exit = timeout;

        if (timeout != null && typeof timeout !== 'number' && typeof timeout !== 'string') {
            exit = timeout.exit;
            enter = timeout.enter;
        }
        return {
            exit: exit as number,
            enter: enter as number,
        };
    }

    updateStatus(mounting = false, nextStatus: TransitionStatus | null) {
        if (nextStatus !== null) {
            this.cancelNextCallback();

            if (nextStatus === ENTERING) {
                this.performEnter(mounting);
            } else {
                this.performExit();
            }
        } else if (this.props.unmountOnExit && this.state.status === EXITED) {
            this.setState({ status: UNMOUNTED });
        }
    }

    get node() {
        const node = this.props.nodeRef?.current;
        if (!node) {
            throw new Error('notistack - Custom snackbar is not refForwarding');
        }
        return node;
    }

    performEnter(mounting: boolean) {
        const { enter } = this.props;
        const isAppearing = mounting;

        const timeouts = this.getTimeouts();

        if (!mounting && !enter) {
            this.safeSetState({ status: ENTERED }, () => {
                if (this.props.onEntered) {
                    this.props.onEntered(this.node, isAppearing);
                }
            });
            return;
        }

        if (this.props.onEnter) {
            this.props.onEnter(this.node, isAppearing);
        }

        this.safeSetState({ status: ENTERING }, () => {
            if (this.props.onEntering) {
                this.props.onEntering(this.node, isAppearing);
            }

            this.onTransitionEnd(timeouts.enter, () => {
                this.safeSetState({ status: ENTERED }, () => {
                    if (this.props.onEntered) {
                        this.props.onEntered(this.node, isAppearing);
                    }
                });
            });
        });
    }

    performExit() {
        const { exit } = this.props;
        const timeouts = this.getTimeouts();

        // no exit animation skip right to EXITED
        if (!exit) {
            this.safeSetState({ status: EXITED }, () => {
                if (this.props.onExited) {
                    this.props.onExited(this.node);
                }
            });
            return;
        }

        if (this.props.onExit) {
            this.props.onExit(this.node);
        }

        this.safeSetState({ status: EXITING }, () => {
            if (this.props.onExiting) {
                this.props.onExiting(this.node);
            }

            this.onTransitionEnd(timeouts.exit, () => {
                this.safeSetState({ status: EXITED }, () => {
                    if (this.props.onExited) {
                        this.props.onExited(this.node);
                    }
                });
            });
        });
    }

    cancelNextCallback() {
        if (this.nextCallback !== null && this.nextCallback.cancel) {
            this.nextCallback.cancel();
            this.nextCallback = null;
        }
    }

    safeSetState(nextState: State, callback: () => void) {
        callback = this.setNextCallback(callback);
        this.setState(nextState, callback);
    }

    setNextCallback(callback: () => void) {
        let active = true;

        this.nextCallback = () => {
            if (active) {
                active = false;
                this.nextCallback = null;

                callback();
            }
        };

        (this.nextCallback as NextCallback).cancel = () => {
            active = false;
        };

        return this.nextCallback;
    }

    onTransitionEnd(timeout: number, handler: () => void) {
        this.setNextCallback(handler);
        const doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
        if (!this.node || doesNotHaveTimeoutOrListener) {
            setTimeout(this.nextCallback as NextCallback, 0);
            return;
        }

        if (this.props.addEndListener) {
            this.props.addEndListener(this.node, this.nextCallback as NextCallback);
        }

        if (timeout != null) {
            setTimeout(this.nextCallback as NextCallback, timeout);
        }
    }

    render() {
        const { status } = this.state;

        if (status === UNMOUNTED) {
            return null;
        }

        const {
            children,
            // filter props for `Transition`
            in: _in,
            mountOnEnter: _mountOnEnter,
            unmountOnExit: _unmountOnExit,
            appear: _appear,
            enter: _enter,
            exit: _exit,
            timeout: _timeout,
            addEndListener: _addEndListener,
            onEnter: _onEnter,
            onEntering: _onEntering,
            onEntered: _onEntered,
            onExit: _onExit,
            onExiting: _onExiting,
            onExited: _onExited,
            nodeRef: _nodeRef,
            ...childProps
        } = this.props;

        return children(status, childProps);
    }
}

function noop() {
    //
}

(Transition as any).defaultProps = {
    in: false,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    enter: true,
    exit: true,

    onEnter: noop,
    onEntering: noop,
    onEntered: noop,

    onExit: noop,
    onExiting: noop,
    onExited: noop,
};

export default Transition;

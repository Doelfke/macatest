import React, { PropsWithChildren } from 'react';

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<PropsWithChildren<{}>, State> {
    constructor(props: PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: object) {
        // Error Logging would go here
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

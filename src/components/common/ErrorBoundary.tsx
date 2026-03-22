import React from "react";

export default class ErrorBoundary extends React.Component<any,any> {
    state = { hasError: false}

    static getDriveredStateFromError(){
        return { hasError: true};
    }

    render() {
        if(this.state.hasError) return <h2> Something went wrong </h2>
        return this.props.children
    }
}
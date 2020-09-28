import React, { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        let {message} = this.props;
        return (
            <>
                <h2>Component Mesage {message}</h2>
            </>
        )
    }
}


export default ErrorMessage;
import React, { Component } from 'react';
import './errorMessage.scss';

class ErrorMessage extends Component {
    render() {
        let {message, classError} = this.props;

        const classes = ['message'];

        if (classError) {
            classes.push('message--error');
        }
        return (
            <>
                <h2 className={classes.join(' ')}>{message}</h2>
            </>
        )
    }
}

export default ErrorMessage;




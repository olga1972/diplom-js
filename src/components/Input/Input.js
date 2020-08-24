import React, { Component } from 'react';
import { Input } from 'reactstrap';

const TextFields = (props) => {
  const { name, type, placeholder, className, onValueChange} = props;

  state = {
    text: ''
}

 //onValueChange = onValueChange.bind(this);

  function onValueChange(e) {
    setState({
        text: e.target.value
    });
  } 
  //handleInput = handleInput.bind(this);
    
      return (
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
          value={Input.value}
          onChange={onValueChange}
          value={state.text}
        />
      )
        {/* <label
          className="label"
          htmlFor="label"
        >
          <span className="span">{placeholder}</span>
          <input
            className="input"
            name={name}
            id={`id-${name}`} */}
            //onFocus={this.handleFocus}
            //onBlur={this.handleBlur}
            //{...props}
          ///>
          //<span className="errorText">{error}</span>
        //</label>
      //);
    }
  

export default TextFields;
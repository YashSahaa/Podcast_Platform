import React from 'react';
import "./style.css";

const InputComponent = ({type,state,setState,placeholder,required}) => {
  return (
    <input type={type} value={state} onChange={(e)=>setState(e.target.value)} placeholder={placeholder} required={required} className='custom-input'/>
  )
}

export default InputComponent;

import React from 'react';
import "./style.css";

const Button = ({style ,text , disabled , onClick}) => {
  return (
    <div onClick={onClick} disabled={disabled} className='custom-button' style={style}>
      {text}
    </div>
  )
}

export default Button;

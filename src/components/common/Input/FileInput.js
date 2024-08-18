import React, { useState } from 'react';
import "./style.css";

const FileInput = ({accept,id,fileHandleFunc,text}) => {

  const [fileSelected,setFileSelected] = useState("");

  const onChange = (e) =>{
      setFileSelected(e.target.files[0].name);
      fileHandleFunc(e.target.files[0]);
  }
  
  return (
    <>
        <label htmlFor={id} className={`custom-input ${!fileSelected ?"label-input":"active"}`}>{fileSelected?`File ${fileSelected} was Selected`:"Click here to "+text}</label>
        <input type="file" accept={accept} id={id} style={{display:"none"}}  onChange={onChange}/>
    </>
  )
}

export default FileInput;

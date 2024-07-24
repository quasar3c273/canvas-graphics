import React from 'react';
import {METHOD_TYPE, TEXT} from "../consts";

const DataTypeInputSelector = ({ onInputMethodChange, inputMethod }) => {
  return (
    <div className="selectTypeBlock">
      <label>
        <input
          type="radio"
          value="textField"
          checked={inputMethod === METHOD_TYPE.textField}
          onChange={() => onInputMethodChange(METHOD_TYPE.textField)}
        />
        {TEXT.uploadText}
      </label>
      <label>
        <input
          type="radio"
          value="fileInput"
          checked={inputMethod === METHOD_TYPE.fileInput}
          onChange={() => onInputMethodChange(METHOD_TYPE.fileInput)}
        />
        {TEXT.uploadFile}
      </label>
      <label>
        <input
          type="radio"
          value="example"
          checked={inputMethod === METHOD_TYPE.example}
          onChange={() => onInputMethodChange(METHOD_TYPE.example)}
        />
        {TEXT.exampleData}
      </label>
    </div>
  );
};

export default DataTypeInputSelector;

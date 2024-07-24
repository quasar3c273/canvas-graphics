import React from 'react';
import { METHOD_TYPE, TEXT } from "../../consts";

const DataInputView = ({ inputMethod, textData, onTextChange, onTextSubmit, onFileChange }) => {

  return (
    <div className="dataInputWrapper">
      {inputMethod === METHOD_TYPE.textField && (
        <>
          <textarea
            rows="6"
            cols="50"
            value={textData}
            onChange={onTextChange}
            placeholder={TEXT.placeholderTextInputJSON}
          />
          <button onClick={onTextSubmit}>{TEXT.apply}</button>
        </>
      )}

      {inputMethod === METHOD_TYPE.fileInput && (
        <input type="file" accept=".json" onChange={onFileChange} />
      )}
    </div>
  );
};

export default DataInputView;

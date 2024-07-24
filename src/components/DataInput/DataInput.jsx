import React, { useState } from 'react';
import DataInputView from "./DataInputView";
import { TEXT_ERROR, ZERO } from "../../consts";

const DataInput = ({ inputMethod, onDataLoaded, onSetError }) => {
  const [textData, setTextData] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[ZERO];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          onDataLoaded(data);
        } catch (error) {
          console.error(error.message);
          onSetError(TEXT_ERROR.invalidFileJSON)
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTextChange = (event) => {
    setTextData(event.target.value);
  };

  const handleTextSubmit = () => {
    try {
      const data = JSON.parse(textData);
      onDataLoaded(data);
    } catch (error) {
      console.error(error.message);
      onSetError(TEXT_ERROR.invalidTextFieldJSON)
    }
  };

  return (
    <DataInputView
      textData={textData}
      inputMethod={inputMethod}
      onTextChange={handleTextChange}
      onFileChange={handleFileChange}
      onTextSubmit={handleTextSubmit}
    />
  );
};

export default DataInput;

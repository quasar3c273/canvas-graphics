import React, { useState } from 'react';

import dataExample from "../../data/dataExample.json";
import { initialSettings, METHOD_TYPE, TEXT_ERROR } from "../../consts";

import './App.css';
import AppView from "./AppView";

const App = () => {
  const [data, setData] = useState(dataExample);
  const [settings, setSettings] = useState(initialSettings);
  const [inputMethod, setInputMethod] = useState(METHOD_TYPE.example);
  const [error, setError] = useState('');

  const handleDataLoaded = (newData) => {
    if (Array.isArray(newData) && newData.every(item => typeof item === 'object' && item !== null)) {
      setData(newData);
    } else {
      handleSetError(TEXT_ERROR.invalidInputJSON);
    }
  };

  const handleInputMethodChange = (method) => {
    setInputMethod(method);
    if (method === METHOD_TYPE.example) {
      setData(dataExample);
    }
  };

  const handleSetError = (textError) => {
    setError(`${textError}`);
  };
  return (
    <AppView
      error={error}
      handleSetError={handleSetError}
      settings={settings}
      setSettings={setSettings}
      handleInputMethodChange={handleInputMethodChange}
      inputMethod={inputMethod}
      handleDataLoaded={handleDataLoaded}
      data={data}
    />
  );
};

export default App;

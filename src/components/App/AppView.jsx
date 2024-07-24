import React from 'react';

import Chart from "../Chart/Chart";
import Settings from "../Settings";
import DataInput from "../DataInput/DataInput";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import DataTypeInputSelector from "../DataTypeSelector";

import './App.css';

const AppView = ({
    error,
    handleSetError,
    settings,
    setSettings,
    handleInputMethodChange,
    inputMethod,
    handleDataLoaded,
    data
  }) => (
  <div className="app">
    <ErrorDisplay
      errorText={error}
      onSetError={handleSetError}
    />
    <div className="appContent">
      <Settings
        settings={settings}
        onVisibilityChange={(newSettings) => setSettings(newSettings)}
        onAxisChange={(newSettings) => setSettings(newSettings)}
      />
      <div className="wrapperInputTypeSelect">
        <DataTypeInputSelector
          onInputMethodChange={handleInputMethodChange}
          inputMethod={inputMethod}
        />
        <DataInput
          inputMethod={inputMethod}
          onDataLoaded={handleDataLoaded}
          onSetError={handleSetError}
        />
      </div>
    </div>
    <Chart data={data} settings={settings} />
  </div>
);

export default AppView;

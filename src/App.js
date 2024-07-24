import React, { useState } from 'react';
import Chart from "./components/Chart";
import Settings from "./components/Settings";
import data from './data/dataExample.json';
import './App.css';

const initialSettings = [
  { label: 'замесяц,м3', key: 'замесяц,м3', visible: true, individualAxis: false },
  { label: 'м3/сут', key: 'м3/сут', visible: false, individualAxis: false },
  { label: 'вода,%(0-100)', key: 'вода,%(0-100)', visible: false, individualAxis: false },
  { label: 'глубина,м', key: 'глубина,м', visible: false, individualAxis: false }
];

function App() {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <div className="App">
      <Settings
        settings={settings}
        onVisibilityChange={setSettings}
        onAxisChange={setSettings}
      />
      <Chart data={data} settings={settings} />
    </div>
  );
}

export default App;

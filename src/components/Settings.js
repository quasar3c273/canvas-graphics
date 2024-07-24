import React from 'react';

const Settings = ({ settings, onVisibilityChange, onAxisChange }) => {
  const handleVisibilityChange = (index) => {
    const newSettings = [...settings];
    newSettings[index].visible = !newSettings[index].visible;
    onVisibilityChange(newSettings);
  };

  const handleAxisChange = (index) => {
    const newSettings = [...settings];
    newSettings[index].individualAxis = !newSettings[index].individualAxis;
    onAxisChange(newSettings);
  };

  return (
    <div className="settings">
      <table>
        <thead>
        <tr>
          <th>Показатель</th>
          <th>Видимость</th>
          <th>Инд. ось</th>
        </tr>
        </thead>
        <tbody>
        {settings.map((setting, index) => (
          <tr key={index}>
            <td>{setting.label}</td>
            <td>
              <input
                type="checkbox"
                checked={setting.visible}
                onChange={() => handleVisibilityChange(index)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={setting.individualAxis}
                onChange={() => handleAxisChange(index)}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;

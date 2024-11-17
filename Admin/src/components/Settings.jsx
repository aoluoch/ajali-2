import React, { useState } from 'react';

const Settings = () => {
  // State management for toggling sections
  const [isGeneralOpen, setGeneralOpen] = useState(true);
  const [isSecurityOpen, setSecurityOpen] = useState(false);
  const [isApiOpen, setApiOpen] = useState(false);
  const [isLogsOpen, setLogsOpen] = useState(false);
  const [isMaintenanceOpen, setMaintenanceOpen] = useState(false);

  // Example form state for settings
  const [formData, setFormData] = useState({
    appName: '',
    passwordPolicy: '',
    enable2FA: false,
    timezone: 'UTC',
    apiKey: '',
    notificationEmail: '',
    enableCache: true,
    backupSchedule: 'Weekly',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = (section) => {
    switch (section) {
      case 'general':
        setGeneralOpen(!isGeneralOpen);
        break;
      case 'security':
        setSecurityOpen(!isSecurityOpen);
        break;
      case 'api':
        setApiOpen(!isApiOpen);
        break;
      case 'logs':
        setLogsOpen(!isLogsOpen);
        break;
      case 'maintenance':
        setMaintenanceOpen(!isMaintenanceOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div className="settings-container p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Settings</h1>

      {/* General Settings */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-gray-200 p-3 rounded-md mb-2"
          onClick={() => handleToggle('general')}
        >
          General Settings
        </button>
        {isGeneralOpen && (
          <div className="bg-gray-100 p-4 rounded-md space-y-4">
            <div>
              <label className="block">Application Name:</label>
              <input
                type="text"
                name="appName"
                value={formData.appName}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="block">Timezone:</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              >
                <option value="UTC">UTC</option>
                <option value="GMT">GMT</option>
                <option value="PST">PST</option>
              </select>
            </div>
            <div>
              <label className="block">Password Policy:</label>
              <input
                type="text"
                name="passwordPolicy"
                value={formData.passwordPolicy}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
          </div>
        )}
      </div>

      {/* Security Settings */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-gray-200 p-3 rounded-md mb-2"
          onClick={() => handleToggle('security')}
        >
          Security Settings
        </button>
        {isSecurityOpen && (
          <div className="bg-gray-100 p-4 rounded-md space-y-4">
            <div>
              <label className="block">Enable Two-Factor Authentication (2FA):</label>
              <input
                type="checkbox"
                name="enable2FA"
                checked={formData.enable2FA}
                onChange={(e) =>
                  setFormData({ ...formData, enable2FA: e.target.checked })
                }
                className="mr-2"
              />
            </div>
            <div>
              <label className="block">Enable Cache:</label>
              <input
                type="checkbox"
                name="enableCache"
                checked={formData.enableCache}
                onChange={(e) =>
                  setFormData({ ...formData, enableCache: e.target.checked })
                }
                className="mr-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* API Management */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-gray-200 p-3 rounded-md mb-2"
          onClick={() => handleToggle('api')}
        >
          API Management
        </button>
        {isApiOpen && (
          <div className="bg-gray-100 p-4 rounded-md space-y-4">
            <div>
              <label className="block">API Key:</label>
              <input
                type="text"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="block">Rate Limiting:</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border border-gray-300"
                placeholder="Set API rate limit"
              />
            </div>
          </div>
        )}
      </div>

      {/* Logs */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-gray-200 p-3 rounded-md mb-2"
          onClick={() => handleToggle('logs')}
        >
          Logs
        </button>
        {isLogsOpen && (
          <div className="bg-gray-100 p-4 rounded-md space-y-4">
            <div>
              <p className="text-gray-500">View recent activity logs</p>
            </div>
            <div>
              <p className="text-gray-500">View error logs</p>
            </div>
          </div>
        )}
      </div>

      {/* Maintenance */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-gray-200 p-3 rounded-md mb-2"
          onClick={() => handleToggle('maintenance')}
        >
          System Maintenance
        </button>
        {isMaintenanceOpen && (
          <div className="bg-gray-100 p-4 rounded-md space-y-4">
            <div>
              <label className="block">Backup Schedule:</label>
              <select
                name="backupSchedule"
                value={formData.backupSchedule}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <button className="bg-blue-500 text-white p-3 rounded-md mt-6">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;

import { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Key, Activity, Server } from 'lucide-react'; // Importing icons from lucide-react

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
    <div className="p-6 bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]">
      <h1 className="text-3xl font-bold mb-4">Admin Settings</h1>

      {/* General Settings */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-[var(--color-primary-300)] p-3 rounded-md mb-2 flex items-center justify-between hover:bg-[var(--color-primary-400)]"
          onClick={() => handleToggle('general')}
        >
          <div className="flex items-center space-x-2">
            <Settings className="text-[var(--color-neutral-900)]" />
            <span>General Settings</span>
          </div>
          {isGeneralOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isGeneralOpen && (
          <div className="bg-[var(--color-neutral-50)] p-4 rounded-md space-y-4">
            <div>
              <label className="block">Application Name:</label>
              <input
                type="text"
                name="appName"
                value={formData.appName}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-[var(--color-neutral-300)]"
              />
            </div>
            <div>
              <label className="block">Timezone:</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-[var(--color-neutral-300)]"
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
                className="w-full p-2 rounded-md border border-[var(--color-neutral-300)]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Security Settings */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-[var(--color-primary-300)] p-3 rounded-md mb-2 flex items-center justify-between hover:bg-[var(--color-primary-400)]"
          onClick={() => handleToggle('security')}
        >
          <div className="flex items-center space-x-2">
            <Shield className="text-[var(--color-neutral-900)]" />
            <span>Security Settings</span>
          </div>
          {isSecurityOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isSecurityOpen && (
          <div className="bg-[var(--color-neutral-50)] p-4 rounded-md space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="enable2FA"
                checked={formData.enable2FA}
                onChange={(e) =>
                  setFormData({ ...formData, enable2FA: e.target.checked })
                }
              />
              <label>Enable Two-Factor Authentication (2FA)</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="enableCache"
                checked={formData.enableCache}
                onChange={(e) =>
                  setFormData({ ...formData, enableCache: e.target.checked })
                }
              />
              <label>Enable Cache</label>
            </div>
          </div>
        )}
      </div>

      {/* API Management */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-[var(--color-primary-300)] p-3 rounded-md mb-2 flex items-center justify-between hover:bg-[var(--color-primary-400)]"
          onClick={() => handleToggle('api')}
        >
          <div className="flex items-center space-x-2">
            <Key className="text-[var(--color-neutral-900)]" />
            <span>API Management</span>
          </div>
          {isApiOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isApiOpen && (
          <div className="bg-[var(--color-neutral-50)] p-4 rounded-md space-y-4">
            <div>
              <label className="block">API Key:</label>
              <input
                type="text"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-[var(--color-neutral-300)]"
              />
            </div>
            <div>
              <label className="block">Rate Limiting:</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border border-[var(--color-neutral-300)]"
                placeholder="Set API rate limit"
              />
            </div>
          </div>
        )}
      </div>

      {/* Logs */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-[var(--color-primary-300)] p-3 rounded-md mb-2 flex items-center justify-between hover:bg-[var(--color-primary-400)]"
          onClick={() => handleToggle('logs')}
        >
          <div className="flex items-center space-x-2">
            <Activity className="text-[var(--color-neutral-900)]" />
            <span>Logs</span>
          </div>
          {isLogsOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isLogsOpen && (
          <div className="bg-[var(--color-neutral-50)] p-4 rounded-md space-y-4">
            <p className="text-[var(--color-neutral-500)]">View recent activity logs</p>
            <p className="text-[var(--color-neutral-500)]">View error logs</p>
          </div>
        )}
      </div>

      {/* Maintenance */}
      <div className="mb-6">
        <button
          className="w-full text-left bg-[var(--color-primary-300)] p-3 rounded-md mb-2 flex items-center justify-between hover:bg-[var(--color-primary-400)]"
          onClick={() => handleToggle('maintenance')}
        >
          <div className="flex items-center space-x-2">
            <Server className="text-[var(--color-neutral-900)]" />
            <span>System Maintenance</span>
          </div>
          {isMaintenanceOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isMaintenanceOpen && (
          <div className="bg-[var(--color-neutral-50)] p-4 rounded-md space-y-4">
            <div>
              <label className="block">Backup Schedule:</label>
              <select
                name="backupSchedule"
                value={formData.backupSchedule}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-[var(--color-neutral-300)]"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

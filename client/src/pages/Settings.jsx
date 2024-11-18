import { useState } from 'react';
import { Bell, Lock, User, Globe, Shield, Database } from 'lucide-react';

const Settings = () => {
  const [loading, setLoading] = useState(false);

  // Sample user data, replace with actual dynamic data if needed
  const user = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    profilePicture: 'https://ui-avatars.com/api/?name=JohnDoe&background=random',
  };

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      locationSharing: true
    },
    account: {
      twoFactorAuth: false,
      language: 'en',
      passwordProtection: false,
      dataBackup: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings updated successfully');
    } catch {
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Settings</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Notification Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
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

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Data Management</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Data Backup</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.account.dataBackup}
                onChange={() => handleToggle('account', 'dataBackup')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
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

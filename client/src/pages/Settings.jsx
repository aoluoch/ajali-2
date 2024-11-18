import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Bell, Lock, User, Globe, Shield, Database } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);

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
      language: 'en'
    }
  });

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
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
      addNotification({
        type: 'success',
        message: 'Settings updated successfully'
      });
    } catch {
      addNotification({
        type: 'error',
        message: 'Failed to update settings'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.username}&background=random`}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{user?.username}</h2>
            <p className="text-gray-600">{user?.email}</p>
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
                type="checkbox"
                checked={settings.notifications.email}
                onChange={() => handleToggle('notifications', 'email')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={() => handleToggle('notifications', 'push')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={() => handleToggle('notifications', 'sms')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Privacy Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Profile Visibility</span>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSelect('privacy', 'profileVisibility', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="contacts">Contacts Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>Location Sharing</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.locationSharing}
                onChange={() => handleToggle('privacy', 'locationSharing')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Account Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.account.twoFactorAuth}
                onChange={() => handleToggle('account', 'twoFactorAuth')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span>Language</span>
            <select
              value={settings.account.language}
              onChange={(e) => handleSelect('account', 'language', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lock className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Security Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Password Protection</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.account.passwordProtection}
                onChange={() => handleToggle('account', 'passwordProtection')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Language Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Preferred Language</span>
            <select
              value={settings.account.language}
              onChange={(e) => handleSelect('account', 'language', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
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
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
import { useState, useEffect } from 'react';
import { Bell, Lock, User, Globe, Shield, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Import i18n hook

const Settings = () => {
  const { t, i18n } = useTranslation(); // Use the translation hook
  const [loading, setLoading] = useState(false);

  // Retrieve user data from localStorage (assuming user profile is stored here)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
      language: 'en',  // Default to English
      passwordProtection: false,
      dataBackup: false
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
    if (category === 'account' && setting === 'language') {
      i18n.changeLanguage(value); 
    }
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
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-8">{t('settings')}</h1> {/* Translated text */}

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.profilePicture || 'https://ui-avatars.com/api/?name=JohnDoe&background=random'}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{user?.username || 'JohnDoe'}</h2>
            <p className="text-gray-600">{user?.email || 'john.doe@example.com'}</p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">{t('notificationSettings')}</h2> {/* Translated text */}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{t('emailNotifications')}</span> {/* Translated text */}
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
            <span>{t('pushNotifications')}</span> {/* Translated text */}
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
            <span>{t('smsNotifications')}</span> {/* Translated text */}
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
          <h2 className="text-lg font-semibold">{t('privacySettings')}</h2> {/* Translated text */}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{t('profileVisibility')}</span> {/* Translated text */}
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSelect('privacy', 'profileVisibility', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="public">{t('public')}</option> {/* Translated text */}
              <option value="private">{t('private')}</option> {/* Translated text */}
              <option value="contacts">{t('contactsOnly')}</option> {/* Translated text */}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>{t('locationSharing')}</span> {/* Translated text */}
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
          <h2 className="text-lg font-semibold">{t('accountSettings')}</h2> {/* Translated text */}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{t('twoFactorAuth')}</span> {/* Translated text */}
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
            <span>{t('language')}</span> {/* Translated text */}
            <select
              value={settings.account.language}
              onChange={(e) => handleSelect('account', 'language', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="en">{t('english')}</option> {/* Translated text */}
              <option value="sw">{t('swahili')}</option> {/* Translated text */}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>{t('passwordProtection')}</span> {/* Translated text */}
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

          <div className="flex items-center justify-between">
            <span>{t('dataBackup')}</span> {/* Translated text */}
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
          {loading ? t('saving') : t('saveChanges')} {/* Translated text */}
        </button>
      </div>
    </div>
  );
};

export default Settings;

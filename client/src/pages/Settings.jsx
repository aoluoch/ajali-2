import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

function Settings() {
  return (
    <div className="p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="text-center mb-6">
          <SettingsIcon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-sm sm:text-base text-gray-600">Settings page is under construction.</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <section>
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Account Preferences</h2>
            <div className="bg-gray-50 p-3 sm:p-4 rounded text-sm sm:text-base text-gray-500">Coming soon...</div>
          </section>
          
          <section>
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Notification Settings</h2>
            <div className="bg-gray-50 p-3 sm:p-4 rounded text-sm sm:text-base text-gray-500">Coming soon...</div>
          </section>
          
          <section>
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Privacy & Security</h2>
            <div className="bg-gray-50 p-3 sm:p-4 rounded text-sm sm:text-base text-gray-500">Coming soon...</div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;

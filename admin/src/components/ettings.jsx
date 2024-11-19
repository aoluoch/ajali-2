import React, { useState } from 'react';

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const handleEmailToggle = () => setEmailNotif(!emailNotif);
  const handleSmsToggle = () => setSmsNotif(!smsNotif);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Notification Settings</h3>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={handleEmailToggle}
            className="mr-2"
          />
          <label className="text-gray-600">Enable Email Notifications</label>
        </div>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={smsNotif}
            onChange={handleSmsToggle}
            className="mr-2"
          />
          <label className="text-gray-600">Enable SMS Notifications</label>
        </div>
        
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;

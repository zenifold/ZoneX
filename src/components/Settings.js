import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Moon,
  Bell,
  Shield,
  User,
  Languages,
  Share2,
  HardDrive,
  Vibrate,
  Volume2,
  Ruler,
  LogOut,
  Edit
} from 'lucide-react';

function Settings({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [useMetric, setUseMetric] = useState(false);
  const [language, setLanguage] = useState('en');
  const [dataSaving, setDataSaving] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleNameSave = () => {
    localStorage.setItem('userName', userName);
    setIsEditingName(false);
  };

  const settingsGroups = [
    {
      title: 'Profile',
      settings: [
        {
          icon: User,
          title: 'Your Name',
          description: 'Edit your display name',
          control: (
            <div className="flex items-center">
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="px-3 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter your name"
                  />
                  <button
                    onClick={handleNameSave}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 dark:text-gray-300">{userName || 'Not set'}</span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )
        }
      ]
    },

    {
      title: 'Appearance',
      settings: [
        {
          icon: Moon,
          title: 'Dark Mode',
          description: 'Toggle dark mode on/off',
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          )
        }
      ]
    },
    {
      title: 'Notifications',
      settings: [
        {
          icon: Bell,
          title: 'Push Notifications',
          description: 'Receive workout reminders and updates',
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          )
        },
        {
          icon: Volume2,
          title: 'Sound Effects',
          description: 'Play sounds for workout events',
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          )
        }
      ]
    },
    {
      title: 'Account',
      settings: [
        {
          icon: LogOut,
          title: 'Log Out',
          description: 'Sign out of your account',
          control: (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Log Out
            </button>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Customize your workout experience
        </p>
      </div>

      <div className="space-y-6">
        {settingsGroups.map((group, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {group.title}
            </h3>
            <div className="space-y-4">
              {group.settings.map((setting, settingIndex) => (
                <div
                  key={settingIndex}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <setting.icon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {setting.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {setting.control}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;
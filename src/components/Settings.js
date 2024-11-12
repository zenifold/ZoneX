import React, { useState } from 'react';
import { Moon, Sun, Edit2, Save, X } from 'lucide-react';

function Settings({ darkMode, toggleDarkMode }) {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameSave = () => {
    if (userName.trim()) {
      localStorage.setItem('userName', userName);
      setIsEditingName(false);
    }
  };

  const handleNameCancel = () => {
    setUserName(localStorage.getItem('userName') || '');
    setIsEditingName(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
          Settings
        </h2>
        
        {/* Display Name Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Display Name
            </h3>
            {!isEditingName && (
              <button 
                onClick={() => setIsEditingName(true)}
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full transition-colors"
                aria-label="Edit name"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {isEditingName ? (
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your name"
                autoFocus
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleNameSave}
                  disabled={!userName.trim()}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleNameCancel}
                  className="flex-1 flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-lg text-gray-700 dark:text-gray-300">
              {userName || 'No name set'}
            </div>
          )}
        </div>

        {/* Theme Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                App Theme
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between light and dark modes
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-indigo-600" />
              )}
            </button>
          </div>
        </div>

        {/* Placeholder for future settings */}
        <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 opacity-50 cursor-not-allowed">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            More Settings (Coming Soon)
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Additional customization options will be added in future updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;

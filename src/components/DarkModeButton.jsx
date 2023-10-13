import React, { useEffect, useState } from 'react';
import '../styles/DarkModeButton.css';
import Cloud from './Cloud';
import Star from './Star';

const DarkModeButton = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const localSettings = JSON.parse(localStorage.getItem('settings'));
    if (!localSettings) {
      const settingsOption = {
        notification: true,
        confirmation: true,
        theme: false,
      };

      localStorage.setItem('settings', JSON.stringify(settingsOption));
      return setSettings(settingsOption);
    }

    return setSettings(localSettings);
  }, []);

  const localSettings = JSON.parse(localStorage.getItem('settings'));
  if (localSettings) {
    document.body.setAttribute('theme-type', localSettings.theme ? 'dark' : '');
  }

  const updateSettings = () => {
    setSettings((prev) => {
      return { ...prev, theme: !prev.theme };
    });
    localStorage.setItem('settings', JSON.stringify({ ...settings, theme: !settings.theme }));
  };

  return (
    <div
      id="darkModeBtn"
      onClick={() => {
        updateSettings();
      }}
    >
      <div className="clouds">
        <Cloud width={'100%'} color={'var(--clr-cloud1)'} className={settings.theme ? 'cloud cloud1 dark' : 'cloud cloud1'} />
        <Cloud width={'100%'} color={'var(--clr-cloud2)'} className={settings.theme ? 'cloud cloud2 dark' : 'cloud cloud2'} />
      </div>
      <div className="stars">
        <Star width={'16%'} className={settings.theme ? 'star star1 dark' : 'star star1'} />
        <Star width={'12%'} className={settings.theme ? 'star star2 dark' : 'star star2'} />
        <Star width={'10%'} className={settings.theme ? 'star star3 dark' : 'star star3'} />
      </div>
      <div className={settings.theme ? 'toggle-dark-mode dark-mode' : 'toggle-dark-mode'}>
        <span className="moon-hole hole1" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
        <span className="moon-hole hole2" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
        <span className="moon-hole hole3" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
      </div>
    </div>
  );
};

export default DarkModeButton;

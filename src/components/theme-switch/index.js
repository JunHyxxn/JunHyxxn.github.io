import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../../utils/localStorage';
import './style.scss';

function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode'));

  useEffect(() => {
    setValueToLocalStorage('isDarkMode', isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleScroll = (e) => {
    if (!window.scrollY) {
      return;
    }
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <div className="scroll-up-button-wrapper">
        <IconButton className="scroll-up-button" onClick={handleScroll}>
          {isDarkMode ? (
            <KeyboardDoubleArrowUpIcon className="dark-scroll-up-icon" fontSize="large" />
          ) : (
            <KeyboardDoubleArrowUpIcon className="light-scroll-up-icon" fontSize="large" />
          )}
        </IconButton>
      </div>
      <div className="dark-mode-button-wrapper">
        <IconButton className="dark-mode-button" onClick={() => setIsDarkMode((isDark) => !isDark)}>
          {isDarkMode ? (
            <LightModeIcon className="dark-mode-icon" fontSize="large" />
          ) : (
            <DarkModeIcon className="dark-mode-icon" fontSize="large" />
          )}
        </IconButton>
      </div>
    </div>
  );
}

export default ThemeSwitch;

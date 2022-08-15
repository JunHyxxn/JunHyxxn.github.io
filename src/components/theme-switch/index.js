import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../../utils/localStorage';
import './style.scss';

function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode'));
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  useEffect(() => {
    setValueToLocalStorage('isDarkMode', isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  // const handleScroll = (e) => {
  //   if (!window.scrollY) {
  //     return;
  //   }
  //   // 현재 위치가 이미 최상단일 경우 return

  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };
  return (
    <div>
      <div className="scroll-up-button-wrapper">
        <IconButton className="scroll-up-button" onClick={handleTop}>
          {isDarkMode ? (
            <KeyboardDoubleArrowUpIcon
              className={BtnStatus ? 'dark-scroll-up-icon' : 'dark-scroll-up-icon-hidden'}
              fontSize="large"
            />
          ) : (
            <KeyboardDoubleArrowUpIcon
              className={BtnStatus ? 'light-scroll-up-icon' : 'light-scroll-up-icon-hidden'}
              fontSize="large"
            />
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

import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {

  //used to check screen size and decide if the navbar must be shown or not
  const [screenSize, setScreenSize] = useState(undefined);
  
  // default theme color
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  
  
  //dark mode or light mode
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };


  /*
  *activate the component on click
  *clicked- element that was clicked, spread initial state and change the clicked value to true
  */ 
  const handleClick = (isClicked) => setIsClicked({ ...initialState, [isClicked]: true });

  return (
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

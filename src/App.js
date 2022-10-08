import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components/index';
import { Calendar, ColorPicker, Collections, CreateNote, EditNotes, ViewNotes, Login, Register, Home, PageNotFound } from './pages/index';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const {user} = useAuthContext()
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={`${currentMode === 'Dark' ? 'dark' : ''} h-screen w-screen`} >
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          {user  ? <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          : null
          }
          { activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
            `${  activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '}
                relative`
            }
          >
            {user ? <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div> : null
            }
            <div className="w-auto h-fit">
              {themeSettings && (<ThemeSettings />)}
              <Routes>
                {/* auth */}
                <Route path='/login' element={!user ? <Login /> : <Navigate to='/home'/>} />
                <Route path='/register' element={!user ? <Register /> : <Navigate to='/home'/>} />

                {/* dashboard */}
                <Route path="/" element={<Navigate to="/collections" />} />
                <Route path='/home'  element={ user ? <Home/> : <Navigate to='/login'/>}  />


                {/* pages */}
                <Route path='/create' element={ user ? <CreateNote /> : <Navigate to='/login'/>} />
                <Route path='/edit' element={ user ? <EditNotes /> : <Navigate to='/login'/>} />
                <Route path='/view' element={ user ? <ViewNotes /> : <Navigate to='/login'/>} />
                <Route path='/collections' element={<Collections />} />

                {/* apps */}
                <Route path='/calendar' element={ user ? <Calendar /> : <Navigate to='/login'/>} />
                {/* <Route path='/color-picker' element={ user ? <ColorPicker /> : <Navigate to='/login'/>} /> */}

                {/* 404 not found */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import { toast, ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Loading from './components/Loading/Loading';
import api from './utils/api';
import { useAuth } from './context/auth';

const App = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const validateToken = async () => {
      if (token) {
        try {
          const response = await api.get('/user/validate', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.valid) {
            setUser(response.data.user);
          } else {
            toast.error("Token is invalid");
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    validateToken();
  }, [setUser]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      showInstallToast(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const showInstallToast = (event) => {
    toast.info(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span>Install our app for a better experience!</span>
        <div
          style={{ backgroundColor: '#c2edcf', padding: '7px 10px', borderRadius: '10px', cursor: 'pointer', marginTop: '10px' }}
          onClick={async () => {
            event.prompt();
            const { outcome } = await event.userChoice;
            if (outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }

          }}
        >
          Install
        </div>
      </div>,
      {
        closeButton: true, // Hide the default close button
        autoClose:2000,
        position:'bottom-right'
      }
    );
  };

  return (
    <BrowserRouter>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      )}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

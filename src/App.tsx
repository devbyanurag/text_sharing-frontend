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
            toast.error("Token is invalid")
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

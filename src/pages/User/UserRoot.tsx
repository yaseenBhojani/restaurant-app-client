import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from '../../components/Common/Navbar';
import Footer from '../../components/Common/Footer';
import Container from '../../components/Common/Container';
import { AppDispatch } from '../../store';
import { isAuth } from '../../store/reducers/authReducer';

const UserRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Check if access token and refresh token exist in localStorage
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken && !refreshToken) {
        return;
      }

      try {
        // Dispatch action to check if the user is authenticated
        const res = await dispatch(isAuth()).unwrap();

        // Redirect to admin page if user is an admin
        if (res.role === 'ADMIN') {
          navigate('/admin');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return (
    <>
      {/* Main container */}
      <Container>
        <Navbar />
        {/* Render nested routes */}
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default UserRoot;

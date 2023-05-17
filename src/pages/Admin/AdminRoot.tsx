import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { isAuth } from '../../store/reducers/authReducer';
import { AppDispatch, RootState } from '../../store';
import Container from '../../components/Common/Container';
import Footer from '../../components/Common/Footer';
import Navbar from '../../components/Common/Navbar';
import Spinner from '../../components/Common/Spinner';

const UserRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, role } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    if (
      !localStorage.getItem('accessToken') &&
      !localStorage.getItem('refreshToken')
    ) {
      return;
    }

    try {
      const res = await dispatch(isAuth()).unwrap();
      // Redirect based on user role
      res.role === 'ADMIN' ? navigate(location.pathname) : navigate('/');
    } catch (error) {
      // Handle error
      console.log(
        axios.isAxiosError(error)
          ? error.response?.data?.message ?? 'An error occurred'
          : 'An error occurred'
      );
    }
  }, [dispatch, location.pathname, navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    // Show spinner while loading
    return <Spinner />;
  }

  return role === 'ADMIN' ? (
    <>
      <Container>
        <Navbar />
        <Outlet />
      </Container>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default UserRoot;

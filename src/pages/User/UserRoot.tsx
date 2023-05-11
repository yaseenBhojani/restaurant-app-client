import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Navbar from '../../components/Common/Navbar';
import Footer from '../../components/Common/Footer';
import Container from '../../components/Common/Container';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { isAuth } from '../../store/reducers/authReducer';

const UserRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem('accessToken') &&
      !localStorage.getItem('refreshToken')
    ) {
      return;
    }

    dispatch(isAuth())
      .unwrap()
      .then(res => res.role === 'ADMIN' && navigate('/admin'))
      .catch((error: unknown) => console.log(error));
  }, [dispatch, navigate]);

  return (
    <>
      <Container>
        <Navbar />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default UserRoot;

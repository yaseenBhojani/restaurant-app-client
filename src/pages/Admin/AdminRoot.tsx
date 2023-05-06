import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../components/Common/Container';
import Footer from '../../components/Common/Footer';
import Navbar from '../../components/Common/Navbar';
import { AppDispatch, RootState } from '../../store';
import { isAuth } from '../../store/reducers/authReducer';
import Spinner from '../../components/Common/Spinner';

const UserRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, role } = useSelector((state: RootState) => state.auth);
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
      .then(res => (res.role === 'ADMIN' ? navigate('/admin') : navigate('/')))
      .catch((error: any) => {
        navigate('/');
        console.log(error);
      });
  }, []);

  if (isLoading) {
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

import { createBrowserRouter } from 'react-router-dom';

import Cart from './pages/User/Cart';
import Checkout from './pages/User/Checkout';
import Error from './pages/Common/Error';
import Foods from './pages/User/Foods';
import Home from './pages/User/Home';
import Login from './pages/Common/Login';
import Orders from './pages/User/Orders';
import SignUp from './pages/Common/SignUp';
import AdminOrders from './pages/Admin/AdminOrders';
import CreateFood from './pages/Admin/CreateFood';
import UserRoot from './pages/User/UserRoot';
import AdminRoot from './pages/Admin/AdminRoot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserRoot />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'foods',
        element: <Foods />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signUp',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminOrders />,
      },
      {
        path: 'create-food',
        element: <CreateFood />,
      },
    ],
  },
]);

export default router;

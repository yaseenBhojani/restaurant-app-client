import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CartItem from '../../components/User/CartItem';
import Heading from '../../components/Common/Heading';

import { Link } from 'react-router-dom';

const CartTable = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  // Calculate total price
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
          {items.length > 0 ? 'Your Cart' : 'Your Cart is Empty'}
        </Heading>
      </Box>
      {items.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{ margin: '10px auto', maxWidth: '99%' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="cart table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                <TableCell sx={{ color: 'common.white' }}>Name</TableCell>
                <TableCell align="center" sx={{ color: 'common.white' }}>
                  Image
                </TableCell>
                <TableCell align="center" sx={{ color: 'common.white' }}>
                  Category
                </TableCell>
                <TableCell align="center" sx={{ color: 'common.white' }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ color: 'common.white' }}>
                  Quantity/Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <CartItem {...item} key={index} />
              ))}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Box sx={{ mr: 2 }}>
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </Box>
            <Link to="/checkout">
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </Link>
          </Box>
        </TableContainer>
      )}
    </>
  );
};

export default CartTable;

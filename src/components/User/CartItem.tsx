// Import statements
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Remove from '@mui/icons-material/Remove';

import { CartItem as ICartItem } from '../../types/interfaces';
import { AppDispatch } from '../../store';
import {
  decrementCount,
  incrementCount,
  removeItem,
} from '../../store/reducers/cartReducer';

// CartItem component
const CartItem = ({
  _id,
  image,
  price,
  name,
  category,
  quantity,
}: ICartItem) => {
  // Redux dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Event handler for removing item from cart
  const removeToCartHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(removeItem(_id!));
  };

  // Event handler for incrementing item count
  const incrementCountHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(incrementCount(_id!));
  };

  // Event handler for decrementing item count
  const decrementCountHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(decrementCount(_id!));
  };

  return (
    <>
      {/* Table row for displaying item */}
      <TableRow key={_id}>
        {/* Item name */}
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        {/* Item image */}
        <TableCell align="center">
          <img
            src={image}
            alt={name}
            height="60"
            width="60"
            style={{ objectFit: 'cover', borderRadius: 5 }}
          />
        </TableCell>
        {/* Item category */}
        <TableCell align="center">{category}</TableCell>
        {/* Item price */}
        <TableCell align="center">${price.toFixed(2)}</TableCell>
        {/* Item quantity and controls */}
        <TableCell align="center">
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            {/* Decrement quantity */}
            <Grid item>
              <IconButton onClick={decrementCountHandler}>
                <Remove />
              </IconButton>
            </Grid>
            {/* Display quantity */}
            <Grid item>
              <Typography variant="h6">{quantity}</Typography>
            </Grid>
            {/* Increment quantity */}
            <Grid item>
              <IconButton onClick={incrementCountHandler}>
                <Add />
              </IconButton>
            </Grid>
            {/* Remove item from cart */}
            <Grid item>
              <IconButton onClick={removeToCartHandler} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      {/* Table row divider */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Divider />
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItem;

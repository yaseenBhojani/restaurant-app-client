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

const CartItem = ({
  _id,
  image,
  price,
  name,
  category,
  quantity,
}: ICartItem) => {
  const dispatch = useDispatch<AppDispatch>();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const removeToCartHandler = () => dispatch(removeItem(_id!));

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const incrementCountHandler = () => dispatch(incrementCount(_id!));

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const decrementCountHandler = () => dispatch(decrementCount(_id!));

  return (
    <>
      <TableRow key={_id}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="center">
          <img
            src={image}
            alt={name}
            height="60"
            width="60"
            style={{ objectFit: 'cover', borderRadius: 5 }}
          />
        </TableCell>
        <TableCell align="center">{category}</TableCell>
        <TableCell align="center">${price.toFixed(2)}</TableCell>
        <TableCell align="center">
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <IconButton onClick={decrementCountHandler}>
                <Remove />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">{quantity}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={incrementCountHandler}>
                <Add />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={removeToCartHandler} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
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

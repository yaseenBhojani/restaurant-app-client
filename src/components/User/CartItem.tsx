import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { CartItem as ICartItem } from '../../types/interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  decrementCount,
  incrementCount,
  removeItem,
} from '../../store/reducers/cartReducer';

const CartItem = ({ _id, image, price, quantity, name }: ICartItem) => {
  const dispatch = useDispatch<AppDispatch>();

  const removeToCartHandler = () => {
    dispatch(removeItem(_id!));
  };

  const incrementCountHandler = () => {
    dispatch(incrementCount(_id!));
  };

  const decrementCountHandler = () => {
    dispatch(decrementCount(_id!));
  };

  return (
    <Card key={_id} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={removeToCartHandler}>
          Remove
        </Button>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={incrementCountHandler}
        >
          +
        </Button>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={decrementCountHandler}
        >
          -
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;

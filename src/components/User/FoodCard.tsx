import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppDispatch, RootState } from '../../store';
import { FoodItem } from '../../types/interfaces';
import { addItem, removeItem } from '../../store/reducers/cartReducer';
import { IconButton } from '@mui/material';

export default function FoodCard({
  _id,
  name,
  description,
  price,
  image,
  category,
}: FoodItem) {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const addToCartHandler = () => {
    dispatch(addItem({ _id, name, description, price, image, category }));
  };

  const removeToCartHandler = () => {
    dispatch(removeItem(_id!));
  };

  return (
    <Card
      sx={{
        width: 345,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={image}
          alt={name}
          sx={{
            objectFit: 'cover',
            borderRadius: '1rem',
          }}
          loading="lazy"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!items.some(item => item._id === _id) ? (
          <IconButton onClick={addToCartHandler} color="primary">
            <AddShoppingCartIcon />
          </IconButton>
        ) : (
          <IconButton onClick={removeToCartHandler} color="primary">
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

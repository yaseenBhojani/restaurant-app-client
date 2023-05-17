// Import statements
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AddShoppingCart, Delete } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../store';
import { FoodItem } from '../../types/interfaces';
import { addItem, removeItem } from '../../store/reducers/cartReducer';

// Styled components
const FoodCardWrapper = styled(Card)({
  width: 345,
  margin: '0 auto',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.3)',
  },
});

const FoodCardImage = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const FoodCardTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.25rem',
  marginBottom: '0.5rem',
});

const FoodCardDescription = styled(Typography)({
  fontSize: '1rem',
  color: 'text.secondary',
  marginBottom: '1rem',
});

const FoodCardPrice = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.25rem',
  color: 'text.primary',
  marginBottom: '0.5rem',
});

const FoodCardCategory = styled(Typography)({
  fontSize: '1rem',
  color: 'text.secondary',
  marginBottom: '1rem',
});

const AddToCartButton = styled(IconButton)({
  backgroundColor: '#fe7f32',
  color: '#fff',
  transition: 'background-color 0.3s ease-out',
  '&:hover': {
    backgroundColor: '#181f2e',
  },
});

const RemoveFromCartButton = styled(IconButton)({
  color: '#ff0000',
  '&:hover': {
    color: '#D32F2F',
  },
});

// FoodCard component
const FoodCard = ({
  _id,
  name,
  description,
  price,
  image,
  category,
}: FoodItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = () => {
    dispatch(addItem({ _id, name, description, price, image, category }));
  };

  const handleRemoveFromCart = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(removeItem(_id!));
  };

  const isInCart = items.some(item => item._id === _id);

  return (
    <FoodCardWrapper>
      <FoodCardImage image={image} />
      <CardContent>
        <FoodCardTitle variant="h5">{name}</FoodCardTitle>
        <FoodCardDescription variant="body1">{description}</FoodCardDescription>
        <FoodCardPrice variant="h6">${price}</FoodCardPrice>
        <FoodCardCategory variant="body2">
          Category: {category}
        </FoodCardCategory>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {!isInCart ? (
          <AddToCartButton aria-label="add to cart" onClick={handleAddToCart}>
            <AddShoppingCart />
          </AddToCartButton>
        ) : (
          <RemoveFromCartButton
            aria-label="remove from cart"
            onClick={handleRemoveFromCart}
          >
            <Delete />
          </RemoveFromCartButton>
        )}
      </CardActions>
    </FoodCardWrapper>
  );
};

export default FoodCard;

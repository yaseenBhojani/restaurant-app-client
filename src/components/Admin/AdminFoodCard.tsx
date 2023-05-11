import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodItem } from '../../types/interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setDeleteItem } from '../../store/reducers/adminFoodItemReducer';
import { useNavigate } from 'react-router-dom';

const AdminFoodCard = ({
  _id,
  name,
  description,
  price,
  image,
  category,
}: FoodItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/admin/update-food/${_id}`);
  };

  const handleDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(setDeleteItem(_id!));
  };

  return (
    <Card
      sx={{
        width: 345,
        backgroundColor: '#F5F5F5',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <CardMedia
        sx={{ height: 200, border: '2px solid #E5E5E5' }}
        image={image}
        title="food item"
      />

      <CardContent sx={{ pb: 2 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#222222' }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '1.125rem', color: '#444444', marginBottom: '1rem' }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '1.125rem',
            color: '#666666',
            marginBottom: '0.5rem',
          }}
        >
          Category: {category}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '1.125rem', color: '#666666' }}
        >
          Price: ${price}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color="primary"
          sx={{
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
          }}
          onClick={handleUpdate}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          sx={{
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
          }}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AdminFoodCard;

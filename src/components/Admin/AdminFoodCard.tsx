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
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardMedia
        sx={{ height: 200, borderRadius: '10px 10px 0px 0px' }}
        image={image}
        title="food item"
      />

      <CardContent sx={{ pb: 2 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#222222',
            marginTop: '1rem',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '1.125rem',
            color: '#444444',
            marginTop: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '1rem',
            color: '#666666',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {category}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '1.125rem',
            color: '#222222',
            fontWeight: 'bold',
          }}
        >
          ${price}
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
          <EditIcon sx={{ fontSize: '1.5rem' }} />
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
          <DeleteIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AdminFoodCard;

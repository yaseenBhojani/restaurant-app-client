import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { AppDispatch, RootState } from '../../store';
import { setDeleteModalIsOpen } from '../../store/reducers/adminFoodItemReducer';
import { deleteFood, getFoods } from '../../store/reducers/foodReducer';
import deleteImage from '../../utils/deleteImage';

const DeleteFoodItemModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { deleteModalIsOpen, deleteItem } = useSelector(
    (state: RootState) => state.adminFoodItem
  );
  const [isLoading, setIsLoading] = useState(false);
  const { foods } = useSelector((state: RootState) => state.food);

  const handleDelete = async () => {
    if (!deleteItem) return;

    setIsLoading(true);
    try {
      await dispatch(deleteFood(deleteItem)).unwrap();
      dispatch(setDeleteModalIsOpen(false));
      const food = foods.find(food => food?._id === deleteItem);
      if (food?.image) await deleteImage(food.image);
      await dispatch(getFoods()).unwrap();
    } catch (error: unknown) {
      axios.isAxiosError(error)
        ? console.log(error.response?.data?.message ?? 'An error occurred')
        : console.log('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setDeleteModalIsOpen(false));
  };

  return (
    <Dialog open={deleteModalIsOpen}>
      <DialogTitle>Delete Food Item</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the following food item?
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', mb: 2 }}
        ></Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          disabled={isLoading}
          variant="outlined"
          startIcon={<CancelIcon />}
          sx={{
            color: 'secondary.main',
            borderColor: 'secondary.main',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          disabled={isLoading}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFoodItemModal;

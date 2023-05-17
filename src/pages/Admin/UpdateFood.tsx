import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { AppDispatch, RootState } from '../../store';
import { updateFood } from '../../store/reducers/foodReducer';
import deleteImage from '../../utils/deleteImage';
import storeImage from '../../utils/storeImage';
import { FoodItem } from '../../types/interfaces';

import Heading from '../../components/Common/Heading';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  margin: '50px auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
});

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '200px',
  marginBottom: '20px',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
});

const ImageOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  '&:hover': {
    opacity: 1,
  },
});

const AddIcon = styled(AddCircleOutlineRounded)({
  fontSize: '2rem',
  color: '#fff',
});

const UpdateFoodPage = () => {
  const { id } = useParams(); // Get id param from URL
  const navigate = useNavigate(); // Navigate function
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch function
  const { foods } = useSelector((state: RootState) => state.food); // Redux state

  const food = foods.find((food: FoodItem) => food._id === id); // Get food item with matching id from redux store

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false); // Snackbar state

  // State hooks for form inputs
  const [name, setName] = useState(food?.name);
  const [description, setDescription] = useState(food?.description);
  const [price, setPrice] = useState(food?.price);
  const [category, setCategory] = useState(food?.category);
  const [image, setImage] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState(food?.image);

  // Handlers for form input changes
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  // Handler for image input change
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Handler for image overlay click
  const handleImageClick = () => {
    document.getElementById('image-input')?.click();
  };

  // Handler for cancel button click
  const handleCancelUpdate = () => {
    navigate('/admin');
  };

  // Handler for form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !description || !price || !category || !id || !food) {
      return;
    }

    setIsLoading(true);

    try {
      let updatedImageUrl = food?.image;

      // If image is updated, delete old image and store new one
      if (image && food?.image) {
        await deleteImage(food.image);
        updatedImageUrl = await storeImage(image);
      }

      // Create updated food item object
      const updatedFood = {
        name,
        description,
        price,
        category,
        image: updatedImageUrl,
      };

      // Dispatch updateFood action and show success snackbar
      await dispatch(updateFood({ id, foodItem: updatedFood })).unwrap();
      setIsSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating food:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for snackbar close
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  if (!food) {
    return <Navigate to="/admin" replace={true} />;
  }

  return (
    <>
      <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
        Update Food
      </Heading>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={handleSnackbarClose}>
          Food updated successfully!
        </Alert>
      </Snackbar>
      <StyledForm onSubmit={handleSubmit}>
        <ImageContainer>
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Food" />
              <ImageOverlay onClick={handleImageClick}>
                <AddIcon />
              </ImageOverlay>
            </>
          ) : (
            <AddIcon sx={{ cursor: 'pointer' }} onClick={handleImageClick} />
          )}
          <input
            id="image-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </ImageContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              sx={{ marginBottom: '20px' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
              sx={{ marginBottom: '20px' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              value={price}
              onChange={handlePriceChange}
              type="number"
              InputProps={{
                startAdornment: (
                  <AttachMoneyIcon style={{ marginRight: '10px' }} />
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={category}
              onChange={handleCategoryChange}
              sx={{ marginBottom: '20px' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              loading={isLoading}
              startIcon={<DoneAllIcon />}
              sx={{ marginRight: '10px' }}
            >
              Update
            </LoadingButton>
            <Button
              variant="contained"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancelUpdate}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </StyledForm>
    </>
  );
};

export default UpdateFoodPage;

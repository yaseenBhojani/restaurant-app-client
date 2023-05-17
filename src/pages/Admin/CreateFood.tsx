// Import statements
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { createFood } from '../../store/reducers/foodReducer';
import { setIsLoading } from '../../store/reducers/adminFoodItemReducer';
import storeImage from '../../utils/storeImage';

// Material-UI component imports
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// Custom component imports
import Heading from '../../components/Common/Heading';

// Styled component definitions
const Root = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  marginTop: '50px',
});

const Content = styled(Paper)({
  padding: '2rem',
  maxWidth: '600px',
  width: '100%',
  borderRadius: '10px',
});

const ImageInput = styled('label')({
  display: 'block',
  width: '100%',
  height: '200px',
  border: '2px dashed #ccc',
  borderRadius: '5px',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '5px',
  },
  '& svg': {
    fontSize: '3rem',
    color: '#ccc',
    marginTop: '1rem',
  },
});

const ImageBox = styled(Box)({
  width: '100%',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
  overflow: 'hidden',
  position: 'relative',
});

const SelectedIcon = styled('div')({
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  width: '50px',
  height: '50px',
  '& svg': {
    fontSize: '2rem',
    color: '#4caf50',
  },
});

const CreateFood = () => {
  // Redux state and dispatch
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.food);

  // Form field values and error/success states
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        setImage(files[0]);
        setImagePreviewUrl(e?.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs
    if (!name || !description || !price || !category || !image) {
      return setError('Please fill all fields');
    }

    if (isNaN(Number(price))) {
      return setError('Price should be a number');
    }

    setError('');

    try {
      // Upload image
      setIsLoading(true);
      const imageUrl = await storeImage(image);
      setIsLoading(false);

      if (!imageUrl) {
        return setError('Error uploading image');
      }

      // Create food
      const foodData = {
        name,
        description,
        price: Number(price),
        category,
        image: imageUrl,
      };
      setIsLoading(true);
      await dispatch(createFood(foodData)).unwrap();
      setSuccess(true);
      setCategory('');
      setDescription('');
      setError('');
      setImage(null);
      setImagePreviewUrl('');
      setName('');
      setPrice('');
    } catch (error) {
      setError('Error creating food');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Heading component */}
      <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
        Create Food
      </Heading>

      {/* Wrapper container */}
      <Wrapper>
        {/* Content container */}
        <Content elevation={3}>
          {/* Success message */}
          {success && (
            <Alert severity="success" sx={{ mb: '1rem' }}>
              <AlertTitle>Success</AlertTitle>
              Food created successfully.
            </Alert>
          )}

          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ mb: '1rem' }}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Root onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <AttachMoneyIcon
                        sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                      />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  variant="outlined"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>

            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />

            <ImageInput>
              {/* Image preview */}
              {imagePreviewUrl ? (
                <ImageBox>
                  <img src={imagePreviewUrl} alt="Food" />
                  <SelectedIcon>
                    <Check />
                  </SelectedIcon>
                </ImageBox>
              ) : (
                <>
                  <PhotoCameraIcon />
                  <p>Click to upload an image</p>
                </>
              )}

              {/* Image input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </ImageInput>

            {/* Submit button */}
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={isLoading}
              sx={{ mt: '1rem' }}
              startIcon={<DoneAllIcon />}
            >
              Create
            </LoadingButton>
          </Root>
        </Content>
      </Wrapper>
    </>
  );
};

export default CreateFood;

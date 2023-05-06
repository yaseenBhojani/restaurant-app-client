import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Heading from '../../components/Common/Heading';
import img from '../../assets/images/img2.jpg';
import storeImage from '../../utils/storeImage';
import { AppDispatch, RootState } from '../../store';
import { createFood } from '../../store/reducers/foodReducer';

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
});

const ImageInput = styled('input')({
  display: 'none',
});

const CreateFood = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.food);

  const [isImageLoad, setIsImageLoad] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [foodCreated, setFoodCreated] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs
    if (!name || !description || !price || !category || !image) {
      return setError('Please fill out all fields');
    }

    setIsImageLoad(true);
    // Upload image to Firebase Storage
    const url = await storeImage(image);

    console.log(name, description, price, url, category);

    dispatch(
      createFood({
        name,
        description,
        price: +price,
        category,
        image: url,
      })
    )
      .unwrap()
      .then(() => setFoodCreated(true))
      .catch((error: any) => setError(error.message));

    // Reset form
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage(null);
    setIsImageLoad(false);
  };

  return (
    <>
      <Heading level={2} imageUrl={img}>
        CREATE FOOD
      </Heading>
      {foodCreated && (
        <Alert onClose={() => setFoodCreated(false)}>
          Food created successfully
        </Alert>
      )}
      {error && (
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      )}
      <Wrapper>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Content>
              <Root onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  required
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  required
                />
                <TextField
                  label="Price"
                  value={price}
                  onChange={event => setPrice(event.target.value)}
                  required
                  type="number"
                />
                <TextField
                  label="Category"
                  value={category}
                  onChange={event => setCategory(event.target.value)}
                  required
                />
                <Box>
                  <ImageInput
                    accept="image/*"
                    id="image-input"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-input">
                    <Button variant="outlined" component="span">
                      Upload Image
                    </Button>
                  </label>
                  {image && <p>{image.name}</p>}
                </Box>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isLoading || isImageLoad}
                >
                  Create
                </LoadingButton>
              </Root>
            </Content>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default CreateFood;

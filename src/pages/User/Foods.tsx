import Grid from '@mui/material/Unstable_Grid2';

import FoodCard from '../../components/User/FoodCard';
import Heading from '../../components/Common/Heading';
import img from '../../assets/images/img2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useEffect } from 'react';
import { getFoods } from '../../store/reducers/foodReducer';
import Spinner from '../../components/Common/Spinner';

const Foods = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { foods, isLoading } = useSelector((state: RootState) => state.food);

  useEffect(() => {
    dispatch(getFoods()).unwrap().catch();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading level={2} imageUrl={img}>
        Delicious Foods
      </Heading>

      {foods.length > 0 && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ margin: '10px auto' }}
        >
          {foods.map(food => (
            <Grid
              xs={6}
              sm={4}
              md={4}
              display="flex"
              justifyContent="center"
              key={food._id}
            >
              <FoodCard {...food} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Foods;

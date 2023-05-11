import Heading from '../../components/Common/Heading';
import Grid from '@mui/material/Unstable_Grid2';

import AdminFoodCard from '../../components/Admin/AdminFoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useEffect, useState } from 'react';
import { getFoods } from '../../store/reducers/foodReducer';
import Spinner from '../../components/Common/Spinner';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import DeleteFoodItemModal from '../../components/Admin/DeleteFoodModal';

const AdminFoods = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { foods, isLoading } = useSelector((state: RootState) => state.food);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const numPages = Math.ceil(foods.length / itemsPerPage);

  useEffect(() => {
    dispatch(getFoods()).unwrap().catch();
  }, [dispatch]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const displayedFoods =
    foods?.length > 0 ? foods.slice(startIndex, startIndex + itemsPerPage) : [];

  return (
    <div>
      <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
        Foods
      </Heading>

      <DeleteFoodItemModal />

      {displayedFoods.length > 0 && (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ margin: '10px auto' }}
          >
            {displayedFoods.map(food => (
              <Grid
                xs={6}
                sm={4}
                md={4}
                display="flex"
                justifyContent="center"
                key={food._id}
              >
                <AdminFoodCard {...food} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} sx={{ margin: '10px auto', width: 'fit-content' }}>
            <Pagination count={numPages} page={page} onChange={handleChange} />
          </Stack>
        </>
      )}
    </div>
  );
};

export default AdminFoods;

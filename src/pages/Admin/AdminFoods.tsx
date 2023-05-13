import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { AppDispatch, RootState } from '../../store';
import { getFoods } from '../../store/reducers/foodReducer';
import AdminFoodCard from '../../components/Admin/AdminFoodCard';
import DeleteFoodItemModal from '../../components/Admin/DeleteFoodModal';
import Heading from '../../components/Common/Heading';
import Spinner from '../../components/Common/Spinner';

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '90%',
  maxWidth: '600px',
  margin: '20px auto',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '& .MuiSelect-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputBase-root': {
    '& input': {
      padding: '12px 14px',
      fontSize: '16px',
    },
  },
}));

const AdminFoods = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { foods, isLoading } = useSelector((state: RootState) => state.food);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 9;
  const numPages = Math.ceil(foods.length / itemsPerPage);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getFoods()).unwrap().catch();
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        searchInputRef.current?.focus();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredFoods = foods.filter(food => {
    const searchTermLower = searchTerm.toLowerCase();
    const nameLower = food.name.toLowerCase();
    const categoryLower = food.category.toLowerCase();
    const priceLower = food.price.toString().toLowerCase();

    return (
      nameLower.includes(searchTermLower) ||
      categoryLower.includes(searchTermLower) ||
      priceLower.includes(searchTermLower)
    );
  });

  const startIndex = (page - 1) * itemsPerPage;
  const displayedFoods = filteredFoods.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
        Foods
      </Heading>

      <DeleteFoodItemModal />

      <SearchWrapper>
        <TextField
          fullWidth
          placeholder="Search (ctrl + k)…"
          variant="standard"
          inputRef={searchInputRef}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ ml: 1, mr: 0.5, color: 'gray' }} />
            ),
          }}
        />
      </SearchWrapper>

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

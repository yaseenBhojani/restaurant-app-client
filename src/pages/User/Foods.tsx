import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import FoodCard from '../../components/User/FoodCard';
import Heading from '../../components/Common/Heading';
import Spinner from '../../components/Common/Spinner';

import { RootState, AppDispatch } from '../../store';
import { getFoods } from '../../store/reducers/foodReducer';

// Styled component for search wrapper
const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '90%',
  maxWidth: '600px',
  margin: '20px auto',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '& .MuiInputBase-root': {
    '& input': {
      padding: '12px 14px',
      fontSize: '16px',
    },
  },
  '& .MuiButtonBase-root': {
    color: theme.palette.text.primary,
  },
}));

const Foods = () => {
  // Redux state and dispatch
  const dispatch = useDispatch<AppDispatch>();
  const { foods, isLoading } = useSelector((state: RootState) => state.food);

  // Pagination and search state
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 9;
  const numPages = Math.ceil(foods.length / itemsPerPage);

  // Ref for search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch foods on component mount
  useEffect(() => {
    dispatch(getFoods()).unwrap().catch();
  }, [dispatch]);

  // Add event listener to focus search input when "Ctrl + K" is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle pagination change
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Filter foods based on search term
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

  // Calculate start index and display the current page's foods
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
      {/* Heading */}
      <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
        Delicious Foods
      </Heading>

      {/* Search input */}
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

      {/* Displayed foods */}
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
                <FoodCard {...food} />
              </Grid>
            ))}
          </Grid>
          {/* Pagination */}
          <Stack spacing={2} sx={{ margin: '10px auto', width: 'fit-content' }}>
            <Pagination count={numPages} page={page} onChange={handleChange} />
          </Stack>
        </>
      )}
    </div>
  );
};

export default Foods;

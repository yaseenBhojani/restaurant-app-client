import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

import { logout } from '../../store/reducers/authReducer';
import { AppDispatch, RootState } from '../../store';

// Styled components
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Logo = styled('img')({
  width: '100px',
  '@media (max-width: 600px)': {
    width: '80px',
  },
});

// Styles
const authBtnStyle = {
  color: '#fff',
  borderColor: '#fff',
  '&:hover': {
    backgroundColor: 'primary.dark',
    color: '#fff',
    borderColor: '#fff',
  },
};

// Pages configuration
const userPages = [
  { name: 'HOME', icon: 'home' },
  { name: 'FOODS', icon: 'utensils' },
  { name: 'CART', icon: 'shopping-cart' },
  { name: 'ORDERS', icon: 'clipboard-list' },
];
const adminPages = [
  { name: 'FOODS', icon: 'utensils' },
  { name: 'ORDERS', icon: 'clipboard-list' },
  { name: 'CREATE FOOD', icon: 'plus-circle' },
];

const ResponsiveAppBar = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  // Event handlers
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    switch (page) {
      case 'HOME':
        navigate('/');
        break;
      case 'FOODS':
        navigate(role === 'ADMIN' ? '/admin' : '/foods');
        break;
      case 'CART':
        navigate('/cart');
        break;
      case 'ORDERS':
        navigate(role === 'ADMIN' ? '/admin/orders' : '/orders');
        break;
      case 'CREATE FOOD':
        navigate('/admin/create-food');
        break;
    }

    setAnchorElNav(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Logo src="/images/logo.png" alt="Logo" />
          </Typography>

          {/* Navigation menu (mobile) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu('')}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {(role === 'USER' ? userPages : adminPages).map(page => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.name)}
                >
                  <Typography component="span" sx={{ marginRight: 2 }}>
                    <i className={`fas fa-${page.icon}`} />
                  </Typography>
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Navigation menu (desktop) */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <Logo src="/images/logo.png" alt="Logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(role === 'USER' ? userPages : adminPages).map(page => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.name)}
                sx={{ mx: 1, color: 'white' }}
              >
                <Typography component="span" sx={{ marginRight: 1 }}>
                  <i className={`fas fa-${page.icon}`} />
                </Typography>
                <Typography>{page.name}</Typography>
              </Button>
            ))}
          </Box>

          {/* Shopping cart icon */}
          {role !== 'ADMIN' && (
            <IconButton
              aria-label="cart"
              sx={{ color: '#fff', mr: 2 }}
              onClick={() => navigate('/cart')}
            >
              <StyledBadge badgeContent={totalQuantity} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          )}

          {/* Login/logout button */}
          {!isAuthenticated ? (
            <Button
              sx={authBtnStyle}
              onClick={() => navigate('/login')}
              startIcon={<LockIcon />}
              variant="outlined"
            >
              Login
            </Button>
          ) : (
            <Button
              sx={authBtnStyle}
              onClick={logoutHandler}
              startIcon={<LockOpenIcon />}
              variant="outlined"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;

import AppBar from '@mui/material/AppBar';
import Badge, { BadgeProps } from '@mui/material/Badge';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '../../assets/images/logo.png';
import { AppDispatch, RootState } from '../../store';
import { logout } from '../../store/reducers/authReducer';

const isUser = true;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }: { theme: any }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Logo = styled('img')({
  width: '100px',
});

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );
  const { totalQuantity } = useSelector((state: RootState) => state.cart);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const pages =
    role === 'USER'
      ? isAuthenticated
        ? ['HOME', 'FOODS', 'CART', 'ORDERS']
        : ['HOME', 'FOODS', 'CART']
      : ['ORDERS', 'CREATE FOOD'];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleCloseNavMenu = (page: string) => {
    switch (page) {
      case 'HOME':
        navigate('/');
        break;
      case 'FOODS':
        navigate('/foods');
        break;
      case 'CART':
        navigate('/cart');
        break;
      case 'ORDERS':
        isUser ? navigate('/orders') : navigate('/admin');
        break;
      case 'CREATE FOOD':
        navigate('/admin/create-food');
        break;
    }

    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
            <Logo src={logo} alt="Logo" />
          </Typography>

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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
            <Logo src={logo} alt="Logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {role === 'ADMIN' && (
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
          {!isAuthenticated ? (
            <Button sx={{ color: '#fff' }} onClick={() => navigate('/login')}>
              Login
            </Button>
          ) : (
            <Button sx={{ color: '#fff' }} onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

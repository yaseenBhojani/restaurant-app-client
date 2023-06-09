// Importing required dependencies and components
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Alert,
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// Importing custom utilities and redux actions
import { AppDispatch, RootState } from '../../store';
import { isValidEmail } from '../../utils/emailValidator';
import { isValidPassword } from '../../utils/passwordValidator';
import { login } from '../../store/reducers/authReducer';

const Login = () => {
  // Hooks for state management
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggles password visibility
  const changePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  // Handles form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return setError('Please fill in all fields!');
    }

    if (!isValidEmail(email)) {
      return setError('Please enter a valid email!');
    }

    if (!isValidPassword(password)) {
      return setError('Please enter a valid password!');
    }

    setError('');
    try {
      const res = await dispatch(login({ email, password })).unwrap();
      res.userCred.role === 'ADMIN' ? navigate('/admin') : navigate('/');
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    } catch (error: unknown) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message ?? 'An error occurred'
          : 'An error occurred'
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {error && (
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        )}
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: isPasswordVisible ? (
                <VisibilityIcon
                  color="secondary"
                  onClick={changePasswordVisibility}
                  cursor="pointer"
                />
              ) : (
                <VisibilityOffIcon
                  color="secondary"
                  onClick={changePasswordVisibility}
                  cursor="pointer"
                />
              ),
            }}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: 'primary.main',
            }}
            loading={isLoading}
            startIcon={<LoginIcon />}
          >
            Login
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                onClick={() => navigate('/signUp')}
                sx={{ cursor: 'pointer' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

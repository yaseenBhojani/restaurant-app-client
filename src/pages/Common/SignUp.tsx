// Importing required dependencies and components
import { FormEvent, useState } from 'react';
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
  HowToReg as HowToRegIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// Importing custom utilities and redux actions
import { AppDispatch, RootState } from '../../store';
import { isValidEmail } from '../../utils/emailValidator';
import { isValidPassword } from '../../utils/passwordValidator';
import { signUp } from '../../store/reducers/authReducer';

const SignUp = () => {
  // Hooks for state management
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggles password visibility
  const changePasswordVisibility = () =>
    setIsPasswordVisible(prevState => !prevState);

  // Handles form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const role = 'USER';

    if (!username || !email || !password) {
      return setError('All fields are required!');
    }

    if (!isValidEmail(email)) {
      return setError('Email is not valid!');
    }

    if (!isValidPassword(password)) {
      return setError('Password must be at least 6 characters!');
    }

    setError('');
    try {
      await dispatch(signUp({ username, email, password, role })).unwrap();
      navigate('/login');
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
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
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            startIcon={<HowToRegIcon />}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ cursor: 'pointer' }}
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;

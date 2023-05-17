import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  setEmail,
  setAddress,
  setCity,
  setZip,
  setCountry,
  setSaveAddress,
} from '../../../store/reducers/checkoutReducer';

// AddressForm component
const AddressForm = () => {
  const dispatch = useDispatch();

  // Event handlers for input changes
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddress(event.target.value));
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity(event.target.value));
  };

  const handleZipChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setZip(event.target.value));
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCountry(event.target.value));
  };

  const handleSaveAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSaveAddress(event.target.checked));
  };

  return (
    <React.Fragment>
      {/* Shipping address heading */}
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        {/* Email input */}
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleEmailChange}
          />
        </Grid>

        {/* Address input */}
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping"
            variant="standard"
            onChange={handleAddressChange}
          />
        </Grid>

        {/* City input */}
        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleCityChange}
          />
        </Grid>

        {/* Zip/Postal code input */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleZipChange}
          />
        </Grid>

        {/* Country input */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleCountryChange}
          />
        </Grid>

        {/* Save address checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="saveAddress"
                value="yes"
                onChange={handleSaveAddressChange}
              />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;

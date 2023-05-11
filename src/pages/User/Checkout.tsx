import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import AddressForm from '../../components/User/Checkout/AddForm';
import PaymentForm from '../../components/User/Checkout/PaymentForm';
import Review from '../../components/User/Checkout/Review';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { validateCheckoutFields } from '../../utils/checkoutFieldsValidator';
import { Fragment, useState } from 'react';
import { createOrder } from '../../store/reducers/checkoutReducer';
import { resetCart } from '../../store/reducers/cartReducer';
import axios from 'axios';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { paymentMethod, shippingAddress } = useSelector(
    (state: RootState) => state.checkout
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const [error, setError] = useState('');

  const checkoutHandler = async () => {
    const errors = validateCheckoutFields({ paymentMethod, shippingAddress });

    if (items.length === 0) return setError('Your cart is empty');

    if (!isAuthenticated) return setError('You must be logged in to checkout');

    if (Object.keys(errors).length !== 0) {
      return setError(errors[Object.keys(errors)[0]]);
    }

    try {
      await dispatch(
        createOrder({
          items,
          address: shippingAddress.address,
          cardName: paymentMethod.cardName,
          cardNumber: +paymentMethod.cardNumber,
          cvv: paymentMethod.cvv,
          city: shippingAddress.city,
          country: shippingAddress.country,
          email: shippingAddress.email,
          zipCode: +shippingAddress.zip,
          totalAmount: +totalPrice,
        })
      ).unwrap();

      setError('');
      setActiveStep(activeStep + 1);
      dispatch(resetCart());
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message ?? 'An error occurred'
          : 'An error occurred'
      );
    }
  };

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </Fragment>
        ) : (
          <Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length - 1 ? checkoutHandler : handleNext
                }
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </Fragment>
        )}
      </Paper>
    </Container>
  );
}

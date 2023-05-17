import { CheckoutState } from '../types/interfaces';

/**
 * Validates the checkout fields and returns any validation errors.
 * @param checkoutData - The checkout data to validate.
 * @returns An object containing validation errors, if any.
 */
export const validateCheckoutFields = (checkoutData: CheckoutState) => {
  const errors: { [key: string]: string } = {};

  if (!checkoutData.shippingAddress.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(checkoutData.shippingAddress.email)) {
    errors.email = 'Email is invalid';
  }

  if (!checkoutData.shippingAddress.address) {
    errors.address = 'Address is required';
  }

  if (!checkoutData.shippingAddress.city) {
    errors.city = 'City is required';
  }

  if (!checkoutData.shippingAddress.zip) {
    errors.zip = 'ZIP code is required';
  }

  if (!checkoutData.shippingAddress.country) {
    errors.country = 'Country is required';
  }

  if (!checkoutData.paymentMethod.cardName) {
    errors.cardName = 'Name on card is required';
  }

  if (!checkoutData.paymentMethod.cardNumber) {
    errors.cardNumber = 'Card number is required';
  } else if (!/^\d+$/.test(checkoutData.paymentMethod.cardNumber)) {
    errors.cardNumber = 'Card number must be a number';
  }

  if (!checkoutData.paymentMethod.expDate) {
    errors.expDate = 'Expiration date is required';
  }

  if (!checkoutData.paymentMethod.cvv) {
    errors.cvv = 'CVV is required';
  }

  return errors;
};

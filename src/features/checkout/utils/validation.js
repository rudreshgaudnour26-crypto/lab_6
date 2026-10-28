export function validateCheckout(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[0-9]{10}$/.test(formData.phone)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (!formData.address.trim()) {
    errors.address = "Delivery address is required.";
  }

  if (!formData.paymentMethod) {
    errors.paymentMethod = "Select a payment method.";
  }

  return errors;
}
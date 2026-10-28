export function validateLogin(email, password) {
  if (!email) {
    return "Email is required.";
  }

  if (!password) {
    return "Password is required.";
  }

  return "";
}

export function validateRegistration(formData) {
  if (!formData.name) {
    return "Name is required.";
  }

  if (!formData.email) {
    return "Email is required.";
  }

  if (!formData.phone) {
    return "Phone number is required.";
  }

  if (!formData.address) {
    return "Delivery address is required.";
  }

  if (!formData.password) {
    return "Password is required.";
  }

  if (!formData.confirmPassword) {
    return "Please confirm your password.";
  }

  if (formData.password !== formData.confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
}
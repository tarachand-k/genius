export default function validateLogin(values) {
  const errors = {};

  // if (!values.firstName) {
  //   errors.firstName = "Required";
  // } else if (values.firstName.length > 15) {
  //   errors.firstName = "Must be 15 characters or less";
  // }

  // if (!values.lastName) {
  //   errors.lastName = "Required";
  // } else if (values.lastName.length > 20) {
  //   errors.lastName = "Must be 20 characters or less";
  // }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (!(values.password.length >= 8)) {
    errors.password = "Must be greater than 8 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function validateRegister(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid username";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (!(values.password.length >= 8)) {
    errors.password = "Must be greater than 8 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Passworda are not same!";
  }

  return errors;
}

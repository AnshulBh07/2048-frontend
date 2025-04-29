export const validateUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9_-]{3,20}$/;

  if (!regex.test(username)) return [false, "Invalid username"];

  return [true, ""];
};

export const validatePassword = (password: string) => {
  if (password.length < 8)
    return [false, "Passwird must be atleast 8 characters long"];

  if (!/[a-z]/.test(password))
    return [false, "Password must contain atleast one lowercase letter"];

  if (!/[A-Z]/.test(password))
    return [false, "Password must contain atleast one uppercase letter"];

  if (!/\d/.test(password))
    return [false, "Password must contain atleast one digit"];

  if (!/[@$!%*?&]/.test(password))
    return [false, "Password must contain atleast one special character"];
  return [true, ""];
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return [false, "Please enter a valid email"];

  return [true, ""];
};

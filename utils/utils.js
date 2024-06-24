/* eslint-disable no-useless-escape */
export const convertRoute = (route) => {
  return route
    .split("/")
    .filter((part) => part)
    .map((part) =>
      part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
};

export const determinePasswordStrength = (password) => {
  let score = 0;

  if (!password) return "";
  // Check password length
  if (password.length > 8) score += 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return "Weak";
    case 3:
      return "Medium";
    case 4:
    case 5:
      return "Strong";
  }
};

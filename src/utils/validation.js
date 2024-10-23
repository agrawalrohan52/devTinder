import validator from "validator";

export const validateSignUpData = (req) => {
  const body = req.body;
  if (!body.firstName || !body.lastName)
    throw new Error("Invalid value for firstName or lastName");
  else if (!validator.isEmail(body.emailId))
    throw new Error("Invalid email id");
  else if (!validator.isStrongPassword(body.password))
    throw new Error("Enter a strong password");
};

export const validateProfileEditData = (req) => {
  const editAllowedFields = [
    "firstName",
    "lastName",
    "age",
    "about",
    "photoUrl",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    editAllowedFields.includes(field)
  );

  if (!isEditAllowed) throw new Error("Edit not allowed");
};

export const validatePasswordUpdateData = async (req) => {
  const loggedInUser = req.user;
  const { existingPassword, newPassword } = req.body;

  if (!existingPassword || !newPassword) {
    throw new Error("Both eixstingPassword and newPassword are required");
  }

  const isPasswordValid = await loggedInUser.validatePassword(existingPassword);
  if (!isPasswordValid) throw new Error("Incorrect existing password");

  const isPasswordStrong = validator.isStrongPassword(newPassword);
  if (!isPasswordStrong) throw new Error("New password is not strong enough");

  if (existingPassword === newPassword)
    throw new Error("New password cannot be same as existing password");
};

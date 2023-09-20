import bcrypt from "bcrypt";

export const generateHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const matchPassword = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

import argon2 from "argon2";

export const createHash = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

export const isValidPassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  console.log(
    `Comparing provided password: ${password} with hashed password: ${hashedPassword}`
  );
  const isMatch = await argon2.verify(hashedPassword, password);
  console.log(`Password match result: ${isMatch}`);
  return isMatch;
};

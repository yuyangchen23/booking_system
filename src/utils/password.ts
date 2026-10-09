import bcrypt from "bcryptjs";
import { env } from "../config/env.js";

const rounds = env.bcryptRounds;

// we omit async since we're already returning Promise
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, rounds);
};

export const verifyPassword = (password: string, hashedPassword: string): Promise<Boolean> => {
  return bcrypt.compare(password, hashedPassword);
}
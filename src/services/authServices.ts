import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../errors/AppError.js";
import { isValidEmailFormat, isValidPasswordFormat } from "../utils/utils.js";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (email: string, passwordHash: string) => {
  try {
    const user = prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(409, "A user with this email already exists");
    }
  }
};

export const registerUser = async (email: unknown, password: unknown) => {
  if (typeof email !== "string") {
    throw new AppError(400, "Email is required");
  };

  if (typeof password !== "string" ||
      password.length < 10 ||
      password.length > 128 ||
      password.trim().length < 0
  ) {
    throw new AppError(400, "Password must contian between 10 to 128 characters");
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmailFormat(normalizedEmail)) {
    throw new AppError(400, "Invalid email format");
  }

  if (!isValidPasswordFormat(password)) {
    throw new AppError(400, "Password must contian between 10 to 128 characters");
  }




};

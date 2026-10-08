import express from "express"
import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js"
import { registerUser } from "../services/authServices.js";


export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const passwordHash = hashPassword(password);

  const newUser = await registerUser(email, passwordHash);
};
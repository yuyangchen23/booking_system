import express from "express"
import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js"
import { registerUser } from "../services/authServices.js";


export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const newUser = await registerUser(email, password);

  return res.status(200).json({
    success: true,
    message: "Successfully registered a user",
    data: newUser
  });
};
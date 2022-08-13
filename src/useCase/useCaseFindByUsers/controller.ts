import { Request,Response } from "express";
import { findByUsersDB } from "../../repositories/findByUsersDB"

export async function findByUsersController(
  req: Request,
  res: Response
) {
  const users = await findByUsersDB()

  return res.status(200).json(users)
}

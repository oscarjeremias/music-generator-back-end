import { Request,Response } from "express";
import { deleteUserDB } from "../../repositories/deleteUserDB"

export async function deleteUserController(
  req: Request,
  res: Response
) {
  const { email } = req.body
  await deleteUserDB(email)
  return res.status(201).send("delete user sucess")
}

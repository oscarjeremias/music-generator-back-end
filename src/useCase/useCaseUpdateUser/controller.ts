import { Request,Response } from "express";
import { updateUserDB } from "../../repositories/updateUserDB";

export async function updateUserController(
  req: Request,
  res: Response
) {
  const data_user = req.body
  await updateUserDB(data_user)

  return res.status(201).send("update user sucess")
}

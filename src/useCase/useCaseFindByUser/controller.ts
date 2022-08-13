import { Request,Response } from "express";
import { findByUserDB } from "../../repositories/findByUserDB";

export async function findByUserController(
  req:Request,
  res:Response) {
    const { email } = req.body
    const user = await findByUserDB(email)
    return res.status(200).json(user)
}

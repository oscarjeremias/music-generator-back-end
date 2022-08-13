import { Request,Response } from "express";
import { findByUsersDB } from "../../repositories/findByUsersDB"
import dotenv from "dotenv";
dotenv.config()
const api_key = `${process.env.API_KEY}`

export async function findByUsersController(
  req: Request,
  res: Response
) {
  const { apiKey } = req.body
  if(apiKey !== api_key) {
    return res.status(400).send("Api key invalida")
  }else {
  const users = await findByUsersDB()

  return res.status(200).json(users)
  }
}

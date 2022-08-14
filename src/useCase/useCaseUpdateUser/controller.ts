import { Request,Response } from "express";
import { updateUserDB } from "../../repositories/updateUserDB";
import dotenv from "dotenv";
dotenv.config()
const api_key = `${process.env.API_KEY}`

export async function updateUserController(
  req: Request,
  res: Response
) {
  const data_user = req.body
  if(data_user.apiKey !== api_key) {
    return res.status(400).send("Api key invalida")
  }else {
  const sms = await updateUserDB(data_user)
  return res.status(201).send(sms || "usuário actualizado com sucesso")
  }
}

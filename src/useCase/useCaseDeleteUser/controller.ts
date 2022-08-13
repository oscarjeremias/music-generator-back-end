import { Request,Response } from "express";
import { deleteUserDB } from "../../repositories/deleteUserDB"
import dotenv from "dotenv";
dotenv.config()
const api_key = `${process.env.API_KEY}`

export async function deleteUserController(
  req: Request,
  res: Response
) {
  const { email,apiKey } = req.body
  if(apiKey !== api_key){
    return res.status(400).send("Api key invalida")
  }else {
  await deleteUserDB(email)
  return res.status(201).send("delete user sucess")
  }
}

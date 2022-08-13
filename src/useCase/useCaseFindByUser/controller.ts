import { Request,Response } from "express";
import { findByUserDB } from "../../repositories/findByUserDB";
import dotenv from "dotenv";
dotenv.config()
const api_key = `${process.env.API_KEY}`

export async function findByUserController(
  req:Request,
  res:Response) {
    const { email,apiKey } = req.body
    if(apiKey !== api_key) {
      return res.status(400).send("Api key invalida")
    }else {
    const user = await findByUserDB(email)
    return res.status(200).json(user)
    }
}

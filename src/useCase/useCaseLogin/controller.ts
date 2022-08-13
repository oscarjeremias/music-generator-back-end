import {Request, Response} from "express";
import { findByUserDB } from "../../repositories/findByUserDB";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const api_key = `${process.env.API_KEY}`
const jwt_key = `${process.env.JWT_KEY}`
export function login(
  req: Request
  ,res: Response) {
  const { apiKey,token } = req.body
  if(apiKey !== api_key) {
    return res.status(400).send("Api key invalida")
  }else {
    jwt.verify(token, jwt_key, async(error:any,decoded:any) => {
      if(error) throw error

      const user = await findByUserDB(decoded.email)
      return res.status(200).json(user)
    })
  }
}

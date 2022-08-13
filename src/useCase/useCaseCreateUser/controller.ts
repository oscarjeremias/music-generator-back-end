import { Request,Response } from "express";
import { createUserDB } from "../../repositories/createUserDB";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
dotenv.config()
const api_key = `${process.env.API_KEY}`

export async function createUserController(
  req:Request,res:Response
) {
  const {name,email,password,url_graphcms,apiKey } = req.body
  if(apiKey !== api_key) {
   return res.status(400).send("Api key invalida!") 
  }else {
  const _id = uuidv4()  
  const sms = await createUserDB({ _id,name,email,password,url_graphcms })

  return res.status(201).send(sms)
  }
}

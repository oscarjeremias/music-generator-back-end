import { Request,Response } from "express";
import { createUserDB } from "../../repositories/createUserDB";
import { v4 as uuidv4 } from 'uuid';

export async function createUserController(
  req:Request,res:Response
) {
  const {name,email,password,url_graphcms } = req.body
  const _id = uuidv4()  
  const sms = await createUserDB({ _id,name,email,password,url_graphcms })

  return res.status(201).send(sms)
}

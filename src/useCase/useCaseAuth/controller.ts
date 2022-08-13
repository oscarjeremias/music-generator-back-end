import { Request,Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { findByUserDB } from "../../repositories/findByUserDB";
import dotenv from "dotenv";
dotenv.config()
const api_key = `${process.env.API_KEY}`
const jwt_key = `${process.env.JWT_KEY}`
const crypto_key = `${process.env.CRYPTO_KEY}`

export async function Auth(
  req:Request,
  res:Response) {
    const { email,password,apiKey } = req.body
    if(apiKey !== api_key) {
      res.status(400).send("Api key invalida")
    }else {
      const userExits = await findByUserDB(email)
      const passwordCrypto = crypto.createHmac(
         'sha256',
         crypto_key)
        .update(password)
        .digest("hex")
      if(userExits?.password === passwordCrypto) {
      jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
      ,email
      },jwt_key ,{ algorithm: "HS256" },(error,token) => {
        if(error) throw error

        return res.status(200).json({ token })
      })
      }else {
        return "password ou email invalido"
      }
    }
}

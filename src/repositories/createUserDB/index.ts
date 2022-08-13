import { connect } from "mongoose";
import { IUser } from "../../enteties/user";
import { SUser } from "../../schema";
import { findByUserDB } from "../findByUserDB"
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config()
const data_base_url = `${process.env.DATA_BASE_URL}`
const crypto_key = `${process.env.CRYPTO_KEY}`

export async function createUserDB({ _id,name,email,password,url_graphcms }: IUser) {
  try {
    await connect(`${data_base_url}`)

    const userExist = await findByUserDB(email)

    if(userExist) {
      return "there is already a user with this email!"
    }else {
      const passwordCrypto = crypto.createHmac(
        'sha256',
        crypto_key)
      .update(password)
      .digest("hex")

      const user = new SUser({
        _id,
        name,
        email,
        password: passwordCrypto,
        url_graphcms
      })

    await user.save()

    return "create user sucess!"
   }
  } catch(error) {
    console.log(error)
  }
}

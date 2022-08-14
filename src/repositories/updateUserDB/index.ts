import { connect } from "mongoose";
import { SUser } from "../../schema";
import { findByUserDB } from "../findByUserDB";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config() 
const data_base_url = `${process.env.DATA_BASE_URL}`
const crypto_key = `${process.env.CRYPTO_KEY}`


export async function updateUserDB(prop:any) {
  try {
    await connect(`${data_base_url}`)
    //update password
    if(prop.password) {
      const passwordCrypto = crypto.createHmac(
          'sha256',
          crypto_key)
        .update(prop.password)
        .digest("hex")

      const userUpdate = await SUser.updateOne({ email:prop.email }, { password: passwordCrypto })

      return !userUpdate && "não há usuário com esse email"

    // update email
    }if (prop.emailExits) {
      const userExits = await findByUserDB(prop.emailExits)
      if(!userExits) {
        return "não há usuário com esse email"
      }else if(userExits?.email === prop.email) {
        return "já existe um usuário com este email"
      }else {
        await SUser.updateOne({ email:prop.emailExits }, { email: prop.email })
      }

    // udape outras props
    } else {
      const keyObject = Object.keys(prop)[1]
      const userUpdate = await SUser.updateOne({ email:prop.email }, { [keyObject]: prop[keyObject] })

      return !userUpdate && "não há usuário com esse email"

    }
  } catch(error) {
    console.log(error)
  }
}

import { connect } from "mongoose";
import { SUser } from "../../schema";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config() 
const data_base_url = `${process.env.DATA_BASE_URL}`
const crypto_key = `${process.env.CRYPTO_KEY}`


export async function updateUserDB(prop:any) {
  try {
    await connect(`${data_base_url}`)
    if(prop.password) {
      const passwordCrypto = crypto.createHmac(
          'sha256',
          crypto_key)
        .update(prop.password)
        .digest("hex")

      await SUser.updateOne({ email:prop.email }, { password: passwordCrypto })

    }else {
      const keyObject = Object.keys(prop)[1]
      await SUser.updateOne({ email:prop.email }, { [keyObject]: prop[keyObject] })

    }
  } catch(error) {
    console.log(error)
  }
}

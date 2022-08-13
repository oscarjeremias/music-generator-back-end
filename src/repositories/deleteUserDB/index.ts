import { connect } from "mongoose";
import { SUser } from "../../schema";
import dotenv from "dotenv";
dotenv.config()
const data_base_url = `${process.env.DATA_BASE_URL}`

export async function deleteUserDB(email:string) {
  try {
    await connect(`${data_base_url}`)
    await SUser.deleteOne({ email })
  } catch(error) {
    console.log(error)
  }
}

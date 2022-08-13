import { SUser } from "../../schema";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const data_base_url = `${process.env.DATA_BASE_URL}`

export async function findByUserDB(email: string) {
  try {
    await connect(data_base_url)
    const user = await SUser.findOne({ email }).exec()
    return user

  } catch(error) {
    console.log(error)
  }
}

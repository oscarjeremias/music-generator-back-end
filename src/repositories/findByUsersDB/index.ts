import { connect } from "mongoose";
import { SUser } from "../../schema";
import dotenv from "dotenv";
dotenv.config()
const data_base_url = `${process.env.DATA_BASE_URL}`

export async function findByUsersDB() {
  try {
    await connect(`${data_base_url}`)

    const users = await SUser.find({}).exec()

    return users
  } catch(error) {
    console.log(error)
  }
}

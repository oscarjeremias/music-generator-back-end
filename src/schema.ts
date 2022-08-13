import { Schema,createConnection } from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const data_base_url = `${process.env.DATA_BASE_URL}`

const connect = createConnection(data_base_url)

const SchemaUser = new Schema({
  _id:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  url_graphcms:{
    type: String,
    required: true
  }
})

export const SUser = connect.model("users",SchemaUser)

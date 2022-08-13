import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { findByUserController } from "./useCase/useCaseFindByUser/controller";
import { findByUsersController } from "./useCase/useCaseFindByUsers/controller";
import { createUserController } from "./useCase/useCaseCreateUser/controller";
import { updateUserController } from "./useCase/useCaseUpdateUser/controller";
import { deleteUserController } from "./useCase/useCaseDeleteUser/controller";

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4000

app.listen(port,() => console.log(`Servidor em pé na porta ${port}`))

app.get("/",async (req,res) => {
  await findByUsersController(req,res)
})

app.post("/find-by-user",async (req,res) => {
  await findByUserController(req,res)
})

app.post("/create-user",async(req,res) => {
  await createUserController(req,res)
})

app.put("/update-user",async (req,res) => {
  await updateUserController(req,res)
})

app.delete("/delete-user",async (req,res) => {
  await deleteUserController(req,res)
})

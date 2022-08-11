import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4000

app.listen(port,() => console.log(`Servidor em pé na porta ${port}`))
app.get("/",(req,res) => {
  return res.status(200).send("Ola mundo")
})


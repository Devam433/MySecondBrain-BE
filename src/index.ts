import express from "express"
import authRouter from "./routes/authRoute"
import contentRouter from "./routes/contentRoute"
import shareLinkRouter from "./routes/shareLinkRoute"
import searchTagsRoute from "./routes/searchTagsRoute"
import mongoose from "mongoose";
import {config} from "dotenv"
import { Application } from "express-serve-static-core";
config()
const app: Application = express();

app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/content',contentRouter)
app.use('/api/v1/share',shareLinkRouter)
app.use('/api/v1',searchTagsRoute)

if (!process.env.connection_string) {
  throw new Error('Environment variable connection_string is not set');
}

mongoose.connect(process.env.connection_string).then((res)=>{
  console.log('DB connected')
}).catch(err=>{
  console.log('Error conneting DB')
})

app.listen(process.env.PORT,()=>{
  console.log(`Server running on port ${process.env.PORT}`)
})
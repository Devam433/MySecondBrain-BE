//extending express Request interface

import { Request } from "express"

interface IUser {
  id:String,
  iat?:Number,
  exp?:Number, 
}

declare global {
  namespace Express {
    interface Request {
      user?:IUser
    }
  }
}
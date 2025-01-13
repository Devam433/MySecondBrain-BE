import { NextFunction, Request,  Response } from "express";
import JWT from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const verifyTokenMiddleware = async(req:Request,res:Response,next:NextFunction):Promise<void> => {
  try {
    if(!req.headers.authorization || !req.headers.authorization?.startsWith('Bearer')) {
      res.status(500).json({success:false,message:'Authorization headers or token missing or Invalid authorization format, ensure Bearer is included!'})
    }

    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
      res.status(500).json({success:false,message:'Token is empty!'})
      return
    }

    console.log(token);

    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret) {
      res.status(500).json({message:'JWT_SECRET not defined!'})
      return
    }
    const decodedJWT = JWT.verify(token,jwtSecret) as {id:String};
    console.log('decodedJwt',decodedJWT)
    req.user = decodedJWT
    console.log('req.user', req.user)
    next()
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, error: 'Token is not valid' });
  }
}
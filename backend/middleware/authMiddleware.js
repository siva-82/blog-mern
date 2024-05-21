import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
     
    console.log("auth middleware req",req)
    
    let token;

    token=req?.cookies?.jwt;
    console.log("token middleware",token)
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            console.log(process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.userId).select('-password')
            console.log(req.user)
            
            next();
        } catch (error) {
            console.log(process.env.JWT_SECRET)
            res.status(401)
            throw new Error('Not Not authorized, invalid token')
        }

    }else{
    console.log("auth middleware else",req)
         
        res.status(401);
        throw new Error('Not authorized, no token')
    }

});

export { protect};

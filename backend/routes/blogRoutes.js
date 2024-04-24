import path from "path";

import express from "express";
// import Blog from "../models/blogModel";
import Post from "../models/postModel.js";

const router = express.Router();



router.get("/", async (req, res) => {
  console.log("blogRoutes")
  const {page}=req.query;
  console.log(page)
  try {

    const blogs =await Post.find({})
    res.status(200).json(blogs)
    
  } catch (error) {
    res.status(401).json({message:error?.message})
  }
});


// router.get("/", async (req, res) => {
//   console.log("blogRoutes")
//   const {page}=req.query;
//   console.log(page)
//   try {
//     const LIMIT=3;
//     const startIndex=(Number(page) - 1) *LIMIT
//     const total=await Post.countDocuments({});
//     const blogs =await Post.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)

//     res.status(200).json({data:blogs,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)})
    
//   } catch (error) {
//     res.status(401).json({message:error?.message})
//   }
// });



export default router;

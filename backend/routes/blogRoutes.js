import path from "path";
import asyncHandler from "express-async-handler";

import express from "express";
// import Blog from "../models/blogModel";
import Post from "../models/postModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("blogRoutes");
    const { page } = req.query;
    console.log(page);
    try {
      const blogs = await Post.find({});
      res.status(200).json(blogs);
    } catch (error) {
      res.status(401).json({ message: error?.message });
    }
  })
);
router.get("/:search", async (req, res) => {
  const queryBlogs = new RegExp(req.params.search, "i");

  if (queryBlogs !== "") {
    try {
      const blogs = await Post.find({ title: queryBlogs });
      if (blogs.length !== 0) {
        res.status(200).json(blogs);
      } else {
        res.status(404).json({ message: "No blogs found" });
      }
    } catch (error) {
      res.status(401).json({ message: error?.message });
    }
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

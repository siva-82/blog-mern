import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import { response } from "express";
// import {uploadSingleImage} from '../routes/uploadRoutes.js'

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const post = await Post.find({});
  console.log("getposts");
  res.status(200).json(post);
});

const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log("getsingleposts");
  console.log("paramid" + req.params.id);
  res.status(200).json(post);
});

// @desc    Create new comment
// @route   POST /api/posts/:post_id/comment
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  console.log("createcomment");
  console.log(req.body);
 
  console.log(req.params);

  const { comment, userName, userId } = req.body;
  console.log(req.params.post_id, comment, userName, userId);

  const post = await Post.findById(req.params.post_id);
  
 if (post) {
    const userComment = {
      postId: req.params.post_id,
      comment_By: userId,
      name:userName,
      comment,
    };
     post.comments.push(userComment);

    await post.save();
    res.status(201).json({ post, message: "Comment added" });
  } else {
    res.status(404);
    throw new Error("Post Not Found");
  }
  

});

// @desc    Update a comment
// @route   PUT /api/posts/:post_id/comment
// @access  Private/Admin
const updateComment = asyncHandler(async (req, res) => {
  console.log("updateComment");
 
  console.log(req.body);
  console.log(req.params);

  const post = await Post.findById(req.body.postId);

  if (post) {

    const cmt = post.comments.find((d) => d.id === req.params.commentId);

    cmt.comment = req.body.comment;

    await post.save( cmt);
    res.json({ message: "Comment Updated" });
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});
// @desc    Delete a comment
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deleteComment = asyncHandler(async (req, res) => {
  const posts = await Post.findById(req.body.postId);

  if(posts){
    const cmtt = posts.comments.find((d) => d.id === req.params.commentId);
    cmtt.deleteOne({id:req.params.commentId})
    
  
    console.log('post')
    console.log(posts)
    await posts.save()
     res.json({ message: "Comment Deleted" })

  }
//   if (comments) {
    // await Post.updateOne(
    //   { _id: req.body.postId },
    //   { $pull: { comments: { _id: req.params.commentId } } },
    //   { new: true }
    // );

    
//     res.json({ message: "Comment Deleted" });
//   }
   else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

// @desc    Create new reply
// @route   POST /api/posts/post_id/:comment_id/reply
// @access  Private
const createReply = asyncHandler(async (req, res) => {
  console.log("createReply")
  console.log(req.body)
  const { reply, postId, commentId, name, replied_By } = req.body;
  console.log(reply, postId, commentId, name, replied_By,req.params.comment_id )
  const commentParam = req.params.comment_id;
  const post = await Post.findById(postId);

  console.log("post.comment find by id ", post);

  if (post) {
    console.log("commentId ", req.params.comment_id);
    const commentId = await post.comments.find((d) => d.id === commentParam);
    console.log("commentId");
    console.log(commentId);
    if (commentId) {
      const userReply = {
        postId: postId,
        commentId,
        replied_By,
        name,
        reply,
      };

      console.log(userReply);

      commentId.replies.push(userReply);

      await post.save();
      res.status(201).json("reply added");
    } else {
      res.status(404);
      throw new Error("Comment not found");
    }
  }
});
// @desc    Update a reply
// @route   PUT /api/:postId/reply/:id
// @access  Private/Admin
const updateReply = asyncHandler(async (req, res) => {
  console.log("createReply")
  console.log(req.body)
  
  const post = await Post.findById(req.body.postId);

  const comment = post.comments.find((d) => d.id === req.body.commentId);
  const rply = comment.replies.find((r) => r.id === req.params.replyId);

  if (rply) {
    rply.reply=req.body.reply    
    // await Post.updateOne(
    //   { _id: req.body.postId, "comments._id": req.body.commentId },
    //   { $set: { "comments.$.replies": { reply: req.body.reply } } }
    // );
    await post.save(rply);

    res.json({ message: "Reply Updated" });
  } else {
    res.status(404);
    throw new Error("Reply not found");
  }
});
// @desc    Delete a reply
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deleteReply = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.postId);

  const comment = post.comments.find((d) => d.id === req.body.commentId);
  const reply = comment.replies.find((r) => r.id === req.params.replyId);

  if (reply) {
    // await Post.updateOne(
    //   { _id: req.body.postId, "comments._id": req.body.commentId },
    //   { $pull: { "comments.$.replies": { _id: req.params.replyId } } }
    // );
    reply.deleteOne({id:req.params.replyId})
    await post.save()
    res.json({ message: "Reply Deleted" });
  } else {
    res.status(404);
    throw new Error("Reply not found");
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // if (post) {

  //   await post.deleteOne({ _id: post._id });
  //   res.json({ message: 'Post Deleted' });
  // } else {
  //   res.status(404);
  //   throw new Error('Post not found');
  // }
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;
  console.log("updatePost");
  console.log(name, image, description);

  const post = await Post.findById(req.param.id);

  if (post) {
    post.user = userId;
    post.name = name;
    post.image = image;
    post.description = description;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post Not Found");
  }
});

export {
  createComment,
  updateComment,
  deleteComment,
  createReply,
  updateReply,
  deleteReply,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
};


  
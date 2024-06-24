import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createComment,
  createReply,
  deleteComment,
  deletePost,
  deleteReply,
  getPosts,
  getSinglePost,
  updateComment,
  updatePost,
  updateReply,
} from "../controller/postController.js";

const router = express.Router();

router.route("/").get(getPosts);
router
  .route("/:id")
  .get(getSinglePost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route("/:post_id/comments").post(protect, createComment);
router
  .route("/comments/:commentId")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

router.route("/:comment_id/replies").put(protect, createReply);
router
  .route("/replies/:replyId")
  .put(protect, updateReply)
  .delete(protect, deleteReply);

export default router;

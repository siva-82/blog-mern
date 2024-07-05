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
router.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);

router.route("/:post_id/comments").post(createComment);
router.route("/comments/:commentId").put(updateComment).delete(deleteComment);

router.route("/:comment_id/replies").put(createReply);
router.route("/replies/:replyId").put(updateReply).delete(deleteReply);

export default router;

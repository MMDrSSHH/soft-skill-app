import { commentService } from "../services/index.js";

/**
 * @type {import("express").RequestHandler}
 */
export const storeComment = async (req, res, next) => {
  const comment = req.body;

  try {
    await commentService.storeComment({
      username: comment.username,
      body: comment.body,
      rate: comment.rate,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

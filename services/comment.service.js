import pool from "../configs/db.js";

/**
 *
 * @param {import("../models/comment.js").Comment} comment
 */
export const storeComment = async (comment) => {
  try {
    const sql =
      "INSERT INTO comment (username, body, rate) VALUES (:username, :body, :rate)";

    await pool.execute(sql, {
      username: comment.username,
      body: comment.body,
      rate: comment.rate,
    });
  } catch (error) {
    throw new Error(`error on storing comment => ${error.message}`);
  }
};

/**
 * @returns {Promise<import("../models/comment.js").Comment[]>}
 */
export const getComments = async () => {
  try {
    const query = `SELECT * FROM comment 
    WHERE is_approved = 1 
    ORDER BY created_at DESC`;

    const [rows] = await pool.query(query);

    return rows;
  } catch (error) {
    throw new Error(`error in getting comments => ${error.message}`);
  }
};

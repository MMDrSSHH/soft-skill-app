import { commentService, porslineService } from "../services/index.js";

/**
 * @type {import("express").RequestHandler}
 */
export const getHomeView = async (req, res, next) => {
  let comments;
  let commentsError;

  let porslineAnalysisResults;
  let porslineAnalysisError;

  try {
    comments = await commentService.getComments();
  } catch (error) {
    commentsError = error.message;
  }

  try {
    porslineAnalysisResults = await porslineService.getSurveyAnalysis();
  } catch (error) {
    porslineAnalysisError = error.message;
  }

  res.render("index", {
    comments,
    commentService,
    porslineAnalysisResults,
    porslineAnalysisError,
  });
};

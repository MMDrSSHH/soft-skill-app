import { config } from "dotenv";
config();

const PORSLINE_API_KEY = process.env.PORSLINE_API_KEY;
const PORSLINE_SURVEY_ID = process.env.PORSLINE_SURVEY_ID;

export const getSurveyResults = async () => {
  try {
    console.log(PORSLINE_API_KEY);
    const response = await fetch(
      `https://survey.porsline.ir/api/v2/surveys/${PORSLINE_SURVEY_ID}/responses/results-table/`,
      {
        headers: {
          Authorization: `API-Key ${PORSLINE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const results = await response.json();

    return results;
  } catch (error) {
    console.log(error);
    throw new Error(`error at getting porsline results => ${error.message}`);
  }
};

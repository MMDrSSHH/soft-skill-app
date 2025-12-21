import { config } from "dotenv";
config();

const PORSLINE_API_KEY = process.env.PORSLINE_API_KEY;
const PORSLINE_SURVEY_ID = process.env.PORSLINE_SURVEY_ID;

const OptionScore = {
  "خیلی مخالفم": 1,
  مخالفم: 2,
  موافقم: 3,
  "خیلی موافقم": 4,
};

export const getSurveyResults = async () => {
  try {
    const response = await fetch(
      `https://survey.porsline.ir/api/v2/surveys/${PORSLINE_SURVEY_ID}/responses/results-table/`,
      {
        headers: {
          Authorization: `API-Key ${PORSLINE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(response)
    if (!Array.isArray(data.body)) {
      throw new Error("Unable to process the data", data);
    }

    // extract just the survey results
    const results = data.body.map((responder) => [
      ...responder.data.slice(2, 17),
    ]);

    return results;
  } catch (error) {
    console.log(error);
    throw new Error(`error at getting porsline results => ${error.message}`);
  }
};

// translate the options to numeric scores
const getSurveyScores = (surveyResults) => {
  const scores = surveyResults.map((responder) => [
    ...responder.map((opt) => OptionScore[opt]),
  ]);

  return scores;
};

export const getSurveyAnalysis = async () => {
  try {
    const rawResults = await getSurveyResults();
    console.log(rawResults);
    const scores = getSurveyScores(rawResults);

    const categories = {
      selfAwareness: [0, 10, 11, 12, 13],
      selfRegulation: [2, 4, 5, 7, 14],
      socialSkills: [1, 6, 9],
      verbalExpression: [3],
      decisionMaking: [8],
    };

    const calculateAverage = (indices) => {
      const sum = indices.reduce(
        (acc, idx) => acc + scores.reduce((acc, score) => acc + score[idx], 0),
        0
      );

      return (sum / indices.length).toFixed(2);
    };

    const analysisResult = {
      labels: [
        "خودآگاهی",
        "خودمدیریتی",
        "مهارت اجتماعی و همدلی",
        "بیان کلامی",
        "تصمیم‌گیری شهودی",
      ],
      scores: [
        calculateAverage(categories.selfAwareness),
        calculateAverage(categories.selfRegulation),
        calculateAverage(categories.socialSkills),
        calculateAverage(categories.verbalExpression),
        calculateAverage(categories.decisionMaking),
      ],
    };

    return analysisResult;
  } catch (error) {
    throw error;
  }
};

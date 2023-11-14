"use client";
import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { GlobalContext } from "../context/state";
import getCategories from "../lib/getCategories";
import { useRouter } from "next/navigation";
import QuestionStyle from "../components/QuestionStyle";
import Result from "../components/Result";
import CountdownTimer from "../components/CountDownTimer";

const Questions = () => {
  const { dataKey } = useContext(GlobalContext);
  const { category, type, difficulty, number } = dataKey;
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({score:0, correctAnswer:0, wrongAnswer:0});
  const router = useRouter();

  

  let url = `https://opentdb.com/api.php?amount=${number}`;
  if (category) {
    url = url.concat(`&category=${category}`);
  }
  if (type) {
    url = url.concat(`&type=${type}`);
  }
  if (difficulty) {
    url = url.concat(`&difficulty=${difficulty}`);
  }
  useEffect(() => {
    async function treatGetData() {
      const data = await getCategories(url);
      const questions = data.results;
      setQuiz(questions);
      setLoading(false);
    }
    treatGetData();
  }, [url]);

  
  return (
    <>
      {loading ? (
        <Box className="flex justify-center items-center mt-[2rem]">
          <CircularProgress />
        </Box>
      ) : !quiz.length ? (
        <div className="m-4">
          <h1>There is no match questions. Try with new settings</h1>
          <Button
            className="bg-blue-600 capitalize m-4"
            variant="contained"
            onClick={() => router.push("/")}
          >
            Back to Settings
          </Button>
        </div>
      ) : !showResult ? (
        <div className="flex flex-col">
          <CountdownTimer
            quiz={quiz}
            setShowResult={setShowResult}
            setResult={setResult}
            result={result}
          />
          <QuestionStyle
            quiz={quiz}
            setShowResult={setShowResult}
            setResult={setResult}
          />
        </div>
      ) : (
        <Result result={result} quiz={quiz} />
      )}
    </>
  );
};

export default Questions;

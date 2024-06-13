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
  const [result, setResult] = useState({score:0, correctAnswer:0, wrongAnswer:0, selectedAnswers: [], counted: 0});
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

      if(data){
      const questions = data.results;
      setQuiz(questions);
      }
      setLoading(false);
    }
    treatGetData();
  }, [url]);


  
  return (
    <div className="my-[100px]">
      {loading ? (
        <Box className="flex justify-center items-center mt-[400px] h-screen">
          <CircularProgress />
        </Box>
      ) : !quiz ? (
        <div className="m-4">
          <h1 className="mb-8">There is no match questions. Try with new settings</h1>
          <Button
            className="bg-blue-600 capitalize"
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
    </div>
  );
};

export default Questions;

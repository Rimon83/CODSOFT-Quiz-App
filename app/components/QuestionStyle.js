import {useState} from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
const QuestionStyle = ({quiz, setShowResult, setResult}) => {
  const [index, setIndex] = useState(0);
  const [backIndex, setBackIndex] = useState();
  const [backIndexCheck, setBackIndexCheck] = useState(false)
  const [answerIndexSelected, setAnswerIndexSelected] = useState();
  const [checkAnswerSelected, setCheckAnswerSelected] = useState(null)
  const [width, setWidth] = useState(100 / quiz.length);


  const entities = {
    "&#039;": "'",
    "&quot;": '"',
    // add more if needed
  };

  const answers = quiz.map((answer) => {
    return [...answer.incorrect_answers, answer.correct_answer];
  });

  const answerIndex = answers[index];

  const handleNextClick = () => {
    setIndex(index + 1);
    setBackIndexCheck(false)
     setAnswerIndexSelected("");
     setWidth((prev) => prev + (100 / quiz.length))
     setResult((prev) => ({
      ...prev,
      selectedAnswers: [],
      counted: 0
     }))
    
  };
  const handleBackClick = () => {
    setIndex(index - 1);
    setBackIndexCheck(true)
    setWidth((prev) => prev - 100 / quiz.length);


    setResult((prev) => ({
      ...prev,
      // Update the score, correctAnswer, and wrongAnswer based on the current selected answer
      score: checkAnswerSelected ? prev.score - 5 : prev.score,
      correctAnswer: checkAnswerSelected
        ? prev.correctAnswer - 1
        : prev.correctAnswer,
      wrongAnswer: checkAnswerSelected
        ? prev.wrongAnswer
        : prev.wrongAnswer - 1,
    }));

 setAnswerIndexSelected(answerIndexSelected);    
  };

  const handleFinishClick = () => {
    setShowResult(true);
  };

  const handleSelectClick = (answer, idx) => {
    setAnswerIndexSelected(idx);
    setBackIndex(idx)

    if (answer === quiz[index].correct_answer) {
      setCheckAnswerSelected(true)
    } else {
            setCheckAnswerSelected(false);

    }
    setResult((prev) =>
      checkAnswerSelected && !prev.selectedAnswers.includes(idx)
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : !checkAnswerSelected && !prev.selectedAnswers.includes(idx) && prev.counted === 0 ?{
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
            counted: 1
          } : {
            ...prev
          }
    );
  };

  return (
    <div className="px-4">
      <Box className="flex flex-col my-10 lg:w-[60%] w-full mx-auto p-8 rounded-lg shadow-lg bg-[#d9fffc] border-t-[6px] relative">
        <div className={`h-2 absolute bg-[#4ba09a] -top-2 left-0`} style={{width: `${width}%`}}></div>
        <div className="flex justify-center">
          <Typography
            variant="h5"
            className="text-center text-[#4ba09a] my-6 max-w-md mx-auto"
          >
            {quiz.length &&
              quiz[index].question.replace(/&#?\w+;/g, (match) => {
                return entities[match] || match;
              })}
          </Typography>
        </div>
        <hr className=" border-[#63fef4] shadow-xl my-[1rem] rounded-md" />
        <div className="flex justify-between mt-4">
          <span className="text-2xl text-[#4ba09a]">
            {index + 1}/{quiz.length}
          </span>
          <p className="font-bold text-[#4ba09a]">5 points</p>
        </div>
        <div className="flex justify-center w-full">
          <ul className="ulStyle w-full">
            {answerIndex &&
              answerIndex.sort().map((answer, idx) => {
                return (
                  <li
                    onClick={() => handleSelectClick(answer, idx)}
                    className={`liStyle cursor-pointer w-full text-[#4ba09a] ${
                      answerIndexSelected === idx ||
                      (backIndexCheck && backIndex === idx)
                        ? "bg-[#63fef4]"
                        : "hover:bg-gray-100"
                    }`}
                    key={idx}
                  >
                    {answer.replace(/&#?\w+;/g, (match) => {
                      return entities[match] || match;
                    })}
                  </li>
                );
              })}
          </ul>
        </div>
        {/* <div className="m-6 text-green-500 text-lg">
              {answerSelected
                 ? (
                  <p>Correct</p>
                ) : answerSelected === false ? (
                  <p>Incorrect: {quiz[index].correct_answer}</p>
                ): ""}
            </div> */}
        <div className="flex gap-3 mt-10 self-end">
          {index > 0 && (
            <Button
              className="bg-blue-600 capitalize mt-4"
              variant="contained"
              onClick={handleBackClick}
            >
              Back
            </Button>
          )}
          {index === quiz.length - 1 ? (
            <Button
              className="bg-blue-600 capitalize mt-4"
              variant="contained"
              onClick={handleFinishClick}
            >
              Finish
            </Button>
          ) : (
            <Button
              className="bg-blue-600 capitalize mt-4"
              variant="contained"
              onClick={handleNextClick}
            >
              Next
            </Button>
          )}
        </div>
      </Box>
    </div>
  );
};

export default QuestionStyle;

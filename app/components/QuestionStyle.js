import {useState} from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
const QuestionStyle = ({quiz, setShowResult, setResult}) => {
  const [index, setIndex] = useState(0);
  const [backIndex, setBackIndex] = useState();
  const [backIndexCheck, setBackIndexCheck] = useState(false)
  const [answerIndexSelected, setAnswerIndexSelected] = useState();
  const [checkAnswerSelected, setCheckAnswerSelected] = useState(null)

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

    
  };
  const handleBackClick = () => {
    setIndex(index - 1);
    setBackIndexCheck(true)
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
      checkAnswerSelected
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
          }
    );
  };

  return (
    <Box className="flex flex-col mt-10 border border-gray-400 sm:w-[60%] w-full mx-auto p-8 rounded-lg shadow-md m-6">
     
        <Typography variant="h5" className="text-center mb-6">
          {quiz.length &&
            quiz[index].question.replace(/&#?\w+;/g, (match) => {
              return entities[match] || match;
            })}
        </Typography>
        
      <div className="flex justify-between mt-4">
        <span className="text-2xl">
          {index + 1}/{quiz.length}
        </span>
        <p className="font-bold">5 points</p>
      </div>
      <div className="flex justify-center">
        <ul className="ulStyle">
          {answerIndex &&
            answerIndex.sort().map((answer, idx) => {
              return (
                <li
                  onClick={() => handleSelectClick(answer, idx)}
                  className={`liStyle cursor-pointer ${
                    (answerIndexSelected === idx ||(backIndexCheck && backIndex === idx))
                      ? "bg-blue-400"
                      : "hover:bg-gray-300"
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
  );
};

export default QuestionStyle;

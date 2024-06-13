import React from 'react'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const Result = ({result, quiz}) => {
 const router = useRouter()
 const {score, correctAnswer, wrongAnswer} = result
 const percentage =Math.trunc((correctAnswer / quiz.length) * 100) || 0;

  return (
    <div className="px-4">
      <Box className=" flex flex-col gap-3 lg:w-1/2 w-full mx-auto p-8 rounded-lg shadow-lg mt-[200px] bg-[#d9fffc]">
        {percentage >= 50 ? (
          <div className="flex justify-center">
            <iframe
              src="https://giphy.com/embed/5Maa0cjKsADyiInagF"
              width="200"
              height="200"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/MachadoMeyer-5Maa0cjKsADyiInagF"></a>
            </p>
          </div>
        ) : (
          <h1 className="text-4xl mb-6 text-[#4ba09a]">Sorry! Failed .</h1>
        )}
        <div className="my-5">
          <h1 className="text-2xl font-bold text-[#4ba09a]">{percentage}%</h1>
        </div>
        <div className="flex gap-2 ">
          <h2 className="text-[#4ba09a]">Score: </h2>
          <p className="text-[#2e8882] font-semibold">{score}</p>
        </div>
        <div className="flex gap-2">
          <h2 className="text-[#4ba09a]">Correct Answer: </h2>
          <p className="text-[#2e8882] font-semibold">{correctAnswer}</p>
        </div>
        <div className="flex gap-2">
          <h2 className="text-[#4ba09a]">Wrong Answer: </h2>
          <p className="text-[#2e8882] font-semibold">{wrongAnswer}</p>
        </div>
        <div className="mt-4">
          <Button
            className="bg-blue-600 capitalize m-4"
            variant="contained"
            onClick={() => router.push("/")}
          >
            Try again
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Result
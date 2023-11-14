import React from 'react'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const Result = ({result, quiz}) => {
 const router = useRouter()
 const {score, correctAnswer, wrongAnswer} = result
 const percentage =Math.trunc((correctAnswer / quiz.length) * 100);

  return (
    <Box className="flex flex-col gap-3 mt-10 border border-gray-400 sm:w-1/2 w-full mx-auto p-8 rounded-lg shadow-md m-6">
      {percentage >= 50 ? (
        <div className="flex justify-center">
          <iframe
            src="https://giphy.com/embed/5Maa0cjKsADyiInagF"
            width="200"
            height="200"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/MachadoMeyer-5Maa0cjKsADyiInagF"></a>
          </p>
        </div>
      ) : (
        <h1 className="text-4xl mb-6">Sorry! Failed .</h1>
      )}
      <div className="my-5">
        <h1 className="text-2xl font-bold">{percentage}%</h1>
      </div>
      <div className="flex gap-2 className='text-2xl'">
        <h2 className="text-green-500">Score: </h2>
        <p>{score}</p>
      </div>
      <div className="flex gap-2 className='text-2xl'">
        <h2 className="text-green-500">Correct Answer: </h2>
        <p>{correctAnswer}</p>
      </div>
      <div className="flex gap-2 className='text-2xl'">
        <h2 className="text-green-500">Wrong Answer: </h2>
        <p>{wrongAnswer}</p>
      </div>
      <div>
        <Button
          className="bg-blue-600 capitalize m-4"
          variant="contained"
          onClick={() => router.push("/")}
        >
          Try again
        </Button>
      </div>
    </Box>
  );
}

export default Result
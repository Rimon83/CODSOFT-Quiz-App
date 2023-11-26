"use client"
import React from 'react'
import { useUserAuth } from "../_utils/auth-context.js";
import { useRouter } from 'next/navigation';


const Login = () => {
 const { user, gitHubSignIn, googleSignIn } = useUserAuth();
 const router = useRouter()
 const handleGithubSignIn = async () => {
   try {
     await gitHubSignIn();
     router.push("/")
   } catch (error) {
     console.log(error);
   }
 };
 const handleGoogleSignIn = async () => {
   try {
     await googleSignIn();
     router.push("/");

   } catch (error) {
     console.log(error);
   }
 };
  return (
    <div className="mt-40 flex flex-col gap-6 justify-center items-center sm:w-1/2 mx-auto w-full border-2 border-gray-400 p-20 rounded-lg">
      <button
        onClick={handleGithubSignIn}
        className="w-1/2 bg-black text-white hover:bg-indigo-500 p-3 rounded-lg"
      >
        Sign in with Github
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="w-1/2 bg-black text-white hover:bg-indigo-500 p-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login
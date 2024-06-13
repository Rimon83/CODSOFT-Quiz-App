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
    <div className="h-screen flex justify-center items-center px-4">
      <div className="flex flex-col gap-6 justify-center items-center max-w-screen-md w-full mx-auto shadow-lg p-20 bg-[#d9fffc] rounded-lg">
        <button
          onClick={handleGithubSignIn}
          className="w-full bg-black text-white hover:bg-[#4ba09a] p-3 rounded-lg"
        >
          Sign in with Github
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-black text-white hover:bg-[#4ba09a] p-3 rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login
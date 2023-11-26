"use client"
import Settings from "./components/Settings";
import { useUserAuth } from "./_utils/auth-context.js";
import Link from "next/link"

export default function Home() {
  const { user } = useUserAuth();

  return (
    <>
      {user ? (
        <div>
          <Settings />
        </div>
      ) : (
        <div className="mt-40 flex flex-col justify-center items-center gap-[100px] sm:w-1/2 w-full mx-auto text-center">
          <h1 className="text-3xl leading-[40px] font-medium">
            Welcome to the Ultimate Quiz Experience! Test your knowledge, and
            challenge your friends. Let the quiz begins!
          </h1>
          <Link className="px-8 py-2 bg-black hover:bg-indigo-500 rounded-lg text-white" href="/login">Get started</Link>
        </div>
      )}
    </>
  );
}

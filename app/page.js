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
        <div className=" flex flex-col justify-center gap-[100px] md:max-w-screen-md w-full mx-auto h-screen text-center">
          <div className="md:w-[80%] w-full mx-auto px-[1rem]">
            <h1 className="lg:text-3xl text-xl leading-[40px] font-medium text-[#4ba09a]">
              Welcome to the Ultimate Quiz Experience! Test your knowledge, and
              challenge your friends. Let the quiz begins!
            </h1>
          </div>
          <div>
            <Link
              className="px-8 py-2 bg-black hover:bg-[#4ba09a] rounded-lg text-white"
              href="/login"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

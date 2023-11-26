"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "../_utils/auth-context.js";
import { useRouter } from "next/navigation.js";




const Navbar = () => {
   const { user, firebaseSignOut } = useUserAuth();
   const router = useRouter()



 const handleSignOut = async () => {
   try {
     await firebaseSignOut();
     router.push("/")
   } catch (error) {
     console.log(error);
   }
 };

  return (
    <>
      <div className="flex-between w-full p-8 bg-slate-200 fixed top-0 z-1">
        <Link href="/" className="flex gap-2 flex-center">
          <Image src="/images/logo.png" alt="Logo" width={75} height={75} />
          <p className="logo_text">Quizfast</p>
        </Link>
        {!user ? (
          <Link
            className="px-4 py-2 bg-black hover:bg-indigo-500 rounded-lg text-white"
            href="/login"
          >
            Sign in
          </Link>
        ) : (
          <div className="flex sm:flex-row flex-col gap-6">
            <h1>{user.displayName}</h1>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

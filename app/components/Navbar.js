"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "../_utils/auth-context.js";
import { useRouter } from "next/navigation.js";




const Navbar = () => {
   const { user, firebaseSignOut } = useUserAuth();
   const router = useRouter()
   const [menu, setMenu] = useState(false)



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
      <div className="flex-between w-full p-8 bg-slate-200 sticky top-0 z-50 text-gray-500">
        <Link href="/" className="flex gap-2 flex-center">
          <Image src="/images/logo.png" alt="Logo" width={75} height={75} />
          <p className="logo_text">Quizfast</p>
        </Link>
        {!user ? (
          <Link
            className="px-4 py-2 bg-black hover:bg-[#4ba09a] rounded-lg text-white"
            href="/login"
          >
            Sign in
          </Link>
        ) : (
          <div className="flex sm:flex-row flex-col gap-6 relative">
            <h1 className="cursor-pointer" onClick={() => setMenu(!menu)}>{user.displayName}</h1>
            {menu && (<div className="absolute top-[50px] right-0 p-4 w-[150px] bg-[#FAFAFA] rounded-md text-gray-500"><button onClick={handleSignOut}>Sign out</button></div>)}
            
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

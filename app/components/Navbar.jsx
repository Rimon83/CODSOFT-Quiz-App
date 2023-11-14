"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";



const Navbar = () => {
  return (
    <div className="flex-around w-full p-8 bg-slate-200">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={75}
          height={75}
        />
        <p className="logo_text">Coding</p>
      </Link>
      <h3 className="text-3xl font-bold">Quizfast</h3>
     
    </div>
  );
};

export default Navbar;

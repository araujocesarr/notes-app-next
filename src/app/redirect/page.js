"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import signInAnon from "../firebase/auth/signin_anon";

export default function MainPage() {
  const router = useRouter();

  const handleButton = async (event) => {
    event.preventDefault();
    const { result, error } = await signInAnon();
    if (error) {
      return console.log(error);
    }
    console.log(result);
    return router.push("/home");
  };
  return (
    <div>
      <h1>Notes App</h1>
      <Link href="/signin">
        <button>Sign In</button>
      </Link>
      <Link href="/signup">
        <button>Sign Up</button>
      </Link>
      <button onClick={handleButton}>Sign In Anónimo</button>
    </div>
  );
}

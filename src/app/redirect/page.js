"use client";
import styles from "../page.module.css";
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
    <>
      <style global jsx>{`
        body {
          background-image: url("../stacked-waves-haikei.svg");
          background-repeat: no-repeat;
          background-size: cover;
          height: 100vh;
          overflow: hidden;
        }
      `}</style>
      <div className={`${styles.container}`}>
        <h1 className={`${styles.title}`}>Notes App</h1>
        <div className={`${styles.wrapper}`}>
          <Link href="/signin" className={`${styles.link}`}>
            <button className={`${styles.button__home}`}>
              <span className={`${styles.button__home__content}`}>Sign In</span>
            </button>
          </Link>
          <Link href="/signup" className={`${styles.link}`}>
            <button className={`${styles.button__home}`}>
              <span className={`${styles.button__home__content}`}>Sign Up</span>
            </button>
          </Link>
          <Link href="" className={`${styles.link}`}>
            <button onClick={handleButton} className={`${styles.button__home}`}>
              <span className={`${styles.button__home__content}`}>
                Sign In Anonymously
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

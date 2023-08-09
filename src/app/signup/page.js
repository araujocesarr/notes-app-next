"use client";
import React from "react";
import { useState } from "react";
import signUp from "../firebase/auth/signup";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { headers } from "next/dist/client/components/headers";
import Head from "next/head";
import Link from "next/link";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    if (error) {
      return console.log(error);
    }
    if (password != confirmPassword) {
      return console.log("password no coincide");
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
      <div className={`${styles.form_wrapper}`}>
        <form onSubmit={handleForm} className={`${styles.form}`}>
          <h1 className={`${styles.title}`}>Sign up</h1>
          <div className={`${styles.inputs}`}>
            <div className={`${styles.fields}`}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder=""
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={`${styles.fields}`}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder=""
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className={`${styles.fields}`}>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
              />
              <label htmlFor="password">Confirm Password</label>
            </div>
            <button type="submit" className={`${styles.button__signup}`}>
              <span className={`${styles.button__signup__content}`}>
                Sign up
              </span>
            </button>
            <Link href="/signin" className={`${styles.link__return}`}>
              Do you have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default Page;

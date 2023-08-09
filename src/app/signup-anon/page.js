"use client";
import React from "react";
import styles from "../signup/page.module.css";

import signInLink from "../firebase/auth/signin_link";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords does not match");
      return console.log("password no coincide");
    }
    const { result, error } = await signInLink(email, password);

    if (error) {
      const errorCode = error.code.split("/")[1];
      const formattedError = errorCode.replace(/-/g, " ");
      const errorMessageWithUppercase =
        formattedError.charAt(0).toUpperCase() + formattedError.slice(1);

      setErrorMessage(errorMessageWithUppercase);
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
            {errorMessage != "" && (
              <h4 className={`${styles.error}`}>{errorMessage}!</h4>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;

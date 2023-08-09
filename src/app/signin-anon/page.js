"use client";
import React from "react";
import styles from "../signup/page.module.css";

import signInLink from "../firebase/auth/signin_link";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signInLink(email, password);

    if (error) {
      return console.log(error);
    }

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
          <h1 className={`${styles.title}`}>Sign in</h1>
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
            <button className={`${styles.button__signup}`} type="submit">
              <span className={`${styles.button__signup__content}`}>
                Sign in
              </span>
            </button>
            <Link href="/" className={`${styles.link__return}`}>
              Don&apos;t have an account? Back to home
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;

"use client";
import { useState, useEffect } from "react";
import firebaseui from "firebaseui";
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import { auth, ui } from "../firebase/config";
import { redirects } from "../../../next.config";
import { redirect } from "next/dist/server/api-utils";

export default function Page() {
  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase.
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          window.location.href = "/home";
          return false;
        },
        uiShown: function () {
          // This is what should happen when the form is full loaded. In this example, I hide the loader element.

          document.getElementById("loader").style.display = "none";
        },
      },
      signInSuccessUrl: false, // This is where should redirect if the sign in is successful.
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        },
      ],
    });
  }, []);

  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading Form</div>
    </>
  );
}

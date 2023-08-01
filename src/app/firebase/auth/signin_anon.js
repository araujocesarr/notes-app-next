import firebase_app from "../config";
import { signInAnonymously, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signInAnon() {
  let result = null,
    error = null;
  try {
    result = await signInAnonymously(auth);
  } catch (e) {
    error = e;
  }
  return { result, error };
}

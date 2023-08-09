import firebase_app from "../config";
import { linkWithCredential, getAuth, EmailAuthProvider } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signInLink(email, password) {
  let result = null,
    error = null;
  const user = auth.currentUser;
  const anonymousCredential = EmailAuthProvider.credential(email, password);
  try {
    result = await linkWithCredential(user, anonymousCredential);
  } catch (e) {
    error = e;
  }
  return { result, error };
}

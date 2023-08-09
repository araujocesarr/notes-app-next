import firebase_app from "../config";
import {
  linkWithCredential,
  getAuth,
  EmailAuthProvider,
  signInWithCredential,
} from "firebase/auth";

const auth = getAuth(firebase_app);

async function linkAnonAccount(email, password) {
  let result = null,
    error = null;
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, password);
    await linkWithCredential(user, credential);
    const linkResult = await signInWithCredential(auth, credential);
    result = { sucess: true, user: linkResult.user };
  } catch (e) {
    error = e;
  }
  return { result, error };
}
export default linkAnonAccount;

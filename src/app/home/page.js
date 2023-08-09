"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  where,
  query,
  collection,
} from "firebase/firestore";
import { notesCollection, db } from "../firebase/config";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import closeUser from "../firebase/auth/signout";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [userStatus, setUserStatus] = useState(false);
  const handleSignOut = async (event) => {
    event.preventDefault();
    const { result, error } = await closeUser();
    if (error) {
      return console.log(error);
    }
    console.log(result);
    return router.push("/");
  };

  useEffect(() => {
    if (user === null) {
      router.push("/redirect");
    }
  }, []);

  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [tempNoteText, setTempNoteText] = useState("");
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  const sortedNotes = notes.sort((a, b) => b.updateAt - a.updateAt);

  useEffect(() => {
    if (user === null) {
      router.push("/redirect");
    } else {
      setUserStatus(user.isAnonymous);
      const q = query(notesCollection, where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, function (snapshot) {
        const notesArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes(notesArr);
      });
      return unsubscribe;
    }
  }, [user]);

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote && currentNote.body !== tempNoteText) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [tempNoteText]);

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  async function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updateAt: Date.now(),
      userId: user.uid,
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(docRef, { body: text, updateAt: Date.now() }, { merge: true });
  }

  async function deleteNotes(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <>
      <main>
        {notes.length > 0 ? (
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className={`${styles.split}`}
          >
            <Sidebar
              userStatus={userStatus}
              notes={sortedNotes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNotes={deleteNotes}
              signOut={handleSignOut}
            />
            <Editor
              tempNoteText={tempNoteText}
              setTempNoteText={setTempNoteText}
            />
          </Split>
        ) : (
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
            <div className={`${styles.no_notes}`}>
              <div className={`${styles.wrapper}`}>
                <h1>You have no notes</h1>
                <button
                  className={`${styles.button__first__note}`}
                  onClick={createNewNote}
                >
                  <span className={`${styles.button__first__note__content}`}>
                    Create one now
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

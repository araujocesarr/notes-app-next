import React from "react";
import styles from "./Sidebar.module.css";
import "react-mde/lib/styles/css/react-mde.css";
import "react-mde/lib/styles/css/react-mde-toolbar.css";
import "react-mde/lib/styles/css/react-mde-preview.css";
import { setAnalyticsCollectionEnabled } from "firebase/analytics";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar(props) {
  const router = useRouter();

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`${styles.title} ${
          note.id === props.currentNote.id ? styles.selected : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className={`${styles.text_snippet}`}>
          {note.body.split("\n")[0].replace(/#/g, "").trim()}
        </h4>
        <button
          className={`${styles.delete_btn}`}
          onClick={() => props.deleteNotes(note.id)}
        >
          <i className={`${styles.gg_trash} ${styles.trash_icon}`}></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className={`${styles.pane} ${styles.sidebar}`}>
      <div className={`${styles.sidebar__header}`}>
        <h3>Notes</h3>
        <button className={`${styles.new_note}`} onClick={props.newNote}>
          +
        </button>
        <button onClick={props.signOut}>Cerrar sesión</button>
        {props.userStatus && (
          <Link href="/signin-anon">
            <button>Sign Up</button>
          </Link>
        )}
      </div>
      {noteElements}
    </section>
  );
}

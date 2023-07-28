// pages/MainPage.js

import React from "react";
import Signup from "./components/Signup"; // Importa el componente de inicio de sesión
import Link from "next/link";

export default function MainPage() {
  // Aquí puedes agregar cualquier lógica o estados que necesites para la página principal

  return (
    <div>
      <h1>Notes App</h1>
      <ul>
        <Link href="/signin">
          <li>Sign In</li>
        </Link>
        <Link href="/signup">
          <li>Sign Up</li>
        </Link>
      </ul>
    </div>
  );
}

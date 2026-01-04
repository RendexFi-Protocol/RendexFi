import { useState } from "react";
import styles from "./Login.module.css";
import logo from "./assets/logo512.PNG";

export default function Login() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.reload();
    } else {
      setError("Falsches Passwort");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img src={logo} alt="RendexFi" className={styles.logo} />

        <h2 className={styles.title}>RendexFi Access</h2>
        <p className={styles.subtitle}>Passwort eingeben</p>

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className={styles.input}
          placeholder="Passwort"
        />

        <button onClick={submit} className={styles.button}>
          Login
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

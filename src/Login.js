import { useState } from "react";

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
      window.location.href = "/";
    } else {
      setError("Falsches Passwort");
    }
  }

  return (
    <div style={{ padding: 50 }}>
      <h2>Passwort</h2>
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={submit}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}
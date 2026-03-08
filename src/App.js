import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import "./layout.css";

// COMPONENTS IMPORTS //

import WalletButton from "./components/wallet/WalletButton";

function App() {
  const [auth, setAuth] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth").then(res => {
      if (res.ok) setAuth(true);
      setChecked(true);
    });
  }, []);

  if (!checked) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={auth ? <Navigate to="/" replace /> : <Login />}
        />

        {/* ROOT */}
        <Route
          path="/"
          element={
            auth ? (
              <>
               <WalletConnectButton/>
              </>
            ) : ( 
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
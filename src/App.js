import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import "./layout.css";
import logo from "./assets/logo512.PNG";

// COMPONENTS IMPORTS //

import WalletConnectButton from "./components/wallet/WalletConnectButton";

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
      <div className="app-logo">
        <img src={logo} alt="RendexFi" />
        </div>
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
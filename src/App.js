import { useEffect, useState } from "react";
import Login from "./Login";

import './App.css';

import WalletConnect from './components/WalletConnect';
import SettingsButton from './components/SettingsButton';
import SearchBar from './components/SearchBar';
import logo from './assets/logo192.png';

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setAuth(data.authenticated))
      .catch(() => setAuth(false));
  }, []);

  // Warten, bis Auth geprüft wurde
  if (auth === null) return null;

  // Wenn nicht eingeloggt → Login anzeigen
  if (!auth) return <Login />;

  // Wenn eingeloggt → deine RendexFi App anzeigen
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-wrapper">
          <div className="nav-left">
            <img src={logo} alt="Logo" />
            <SearchBar />
          </div>
          <div className="nav-right">
            <SettingsButton />
            <WalletConnect />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
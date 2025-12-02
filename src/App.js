import './App.css';

import WalletConnect from './components/WalletConnect';
import SettingsButton from './components/SettingsButton';
import SearchBar from './components/SearchBar';

function App() {
  
  return (
    <div className="App">
        <nav className="navbar">
            <div className="nav-wrapper">
                <div className="nav-left">
                  
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

import logo from './logo.svg';
import './App.css';
import OcrScanner from './OcrScanner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <OcrScanner />
      </header>
      
    </div>
  );
}

export default App;
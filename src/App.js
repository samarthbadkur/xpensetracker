import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;

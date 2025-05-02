import './App.css';
//import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Frontpage from './Components/Frontpage';

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
} */
function App() {
  return(
    <>
    <NoteState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Frontpage/>} />
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;

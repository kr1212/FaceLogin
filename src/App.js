import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import About from './components/About'
import Blog from './components/Blog'
import Protected from './components/Protected';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={HomePage}/>
        <Route path='/about' element={About}/>
        <Route path='/blog' element={
        <Protected isLoggedIn={Navbar.returnCondition}>
        <Blog />
        </Protected>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { Outlet } from 'react-router-dom'; 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AllBlogs from './pages/AllBlogs';
import SingleBlog from './pages/SingleBlog';

function App() {
  return (
    <div className="App">
      
      <Outlet/>
   
    </div>
  );
}

export default App;

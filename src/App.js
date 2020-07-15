import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleBtn from './components/GoogleSignButton';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <Main />
    </div>
    </BrowserRouter>
  );
}

export default App;

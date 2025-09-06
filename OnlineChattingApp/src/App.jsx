import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatting from './component/chat/Chatting'
import Joins from './component/join/Joins';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" Component={Joins}/>
      <Route path="/chatting" Component={Chatting}/>
      <Route path="/login" Component={Login}/>
      <Route path="/signup" Component={Signup}/>
     </Routes>
     </BrowserRouter>
   </>
  )
}

export default App

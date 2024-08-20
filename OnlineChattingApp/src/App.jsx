import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatting from './component/chat/Chatting'
import Joins from './component/join/Joins';



function App() {

  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" Component={Joins}/>
      <Route path="/chatting" Component={Chatting}/>
     </Routes>
     
     
     </BrowserRouter>
   </>
  )
}

export default App

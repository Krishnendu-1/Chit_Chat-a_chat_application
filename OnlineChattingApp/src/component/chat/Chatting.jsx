import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Messages from './Messages';
import { username } from '../join/Joins';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

function Chatting(){
  const [messages,setMessages]=useState([])
// const endpoint='http://localhost:4000';
const endpoint='https://chitchat-backend-server.onrender.com';
  const [id,setId]=useState('');

  const sendmessage=()=>{
    const socket= io(endpoint, { transports: ['websocket'] });//*⭐⭐⭐⭐because outside it'll run for once and onchange in useeffect will run again , causing to print logs 2 times. here it will run onchange in the function only⭐
    const message=document.getElementById('senduser').value;

    //check whether message is empty or not
    if(message){
    socket.emit('sendmsg',{message,id});
    document.getElementById('senduser').value='';//to empty filed after emiting;
    }
  }

  useEffect(()=>{
    const socket= io(endpoint, { transports: ['websocket'] });//⭐⭐⭐⭐because outside it'll run for once and onchange in useeffect will run again , causing to print logs 2 times. here it will run onchange in the function only⭐
    socket.on('connect',()=>{
    setId(socket.id);//whenver client connected, "socket.id" will pass to useState(), later this is used to accessed "name" of "sender" and the accotiated "message".
    });//server will recieve when client lands in this page , the function invoked the server "io.on()"
   
    socket.emit('join',{username});//will emits/send the username to the server
    
    //accessing the "me" message except "All"
    socket.on('massage',(data)=>{
      setMessages((prev)=>[...prev,data]);//*⭐⭐⭐⭐⭐By using [...messages, data], you are creating a new array that includes all the previous messages and the new message.
      console.log(data.user,data.message);
    
    });

  // accessing to "All" message can see except "me"
  socket.on('newjoin',(data)=>{
    setMessages((prev)=>[...prev,data]);
    console.log(data.user,data.message);
});

// socket.once('left',(data)=>{
// setMessages((prev)=>[...prev,data]);
// });


return ()=>{
//⭐2 times print problem due to "socket.on('disconnet')" & reserved keyword problem --> ALL SOLVED USING "socket.disconnect()" ⭐⭐⭐
      socket.disconnect();//*this in-built(socket.disconnect();) event will invoke backend event to disconnect, not use 'disconnect' as event-->eg, socket.emit('disconnect'); it is a reserved keyword in "socket.io"
      socket.off();//dont forget to off() it.
      
      }
  },[endpoint]);

  
   

useEffect(()=>{
    const socket= io(endpoint, { transports: ['websocket'] });
     socket.on('showmsg',(data)=>{
    setMessages((prev)=>[...prev,data]);
    console.log(data.user,data.message,data.id);
  });
  
  return ()=>{
    socket.off();
  }
},[messages])


useEffect(()=>{
  const socket= io(endpoint, { transports: ['websocket'] });
  socket.once('left',(data)=>{
    setMessages((prev)=>[...prev,data]);
    console.log(data.message);
    });

    return () => {
        socket.disconnect();
        socket.off();
    };
},[])






  return (
    <div style={{height:'80vh'}}>
    <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
      <Container fluid>
        <Navbar.Brand ><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaSmw9-rAur-kI3b0yFn8K0d8g8f6HlrvGQ&s" roundedCircle className=' h-12 w-12'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll >
            <Nav.Link href="#" active>Home</Nav.Link>
            <NavDropdown title="Krishnendu Roy" id="navbarScrollingDropdown">
              <NavDropdown.Item href="https://www.linkedin.com/in/krishnenduroy1/">LinkedIn</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="https://github.com/Krishnendu-1">
                GitHub
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className=' flex justify-center items-center h-full w-full'>
    <Card className=' w-[25rem] h-[20rem] flex flex-col justify-between' >
      <div className='w-full min-h-10 bg-green-600 flex justify-between items-center'>
        <h1 className=' text-white text-xl font-bold font-sans'>Chit Chat</h1>
      </div>
      <ReactScrollToBottom className=' overflow-y-hidden'>{ /* autoscroll to bottom   */}
        {messages.map((item,idd)=>(<Messages key={idd} user={item.id==id?"You":item.user} message={item.message} side={item.id==id?{display:'flex',alignItems:'end', flexDirection:'column'}:{display:'flex',alignItems:'start', flexDirection:'column',}}/>))}      
      </ReactScrollToBottom>
      <div>
      <InputGroup >
        <Form.Control onKeyPress={(e)=>{e.key==='Enter'?sendmessage():null}} placeholder="what's on your mind" aria-label="what's on your mind" aria-describedby="user"  id='senduser'/>
        <Button variant='success' onClick={sendmessage}><img src="https://media.istockphoto.com/id/1290684294/vector/send-message-icon.jpg?s=612x612&w=0&k=20&c=8vwd4PDMzEELKMUrTQ7LZnpngAN5Bzs55sRJ09sA8FU=" className='h-10 w-10 rounded-md' /></Button>
      </InputGroup> 
      </div>
    </Card>
   </div>
   </div>
  )
}

export default Chatting






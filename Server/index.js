import http from 'http'
import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'

configDotenv();
const port=process.env.PORT || 3000;
const app=express();
app.use(cors());
const server =http.createServer(app);
const io = new Server(server);

const users=[{}];
app.get('/',(req,res)=>{//always it will take "req" and then "res" it.
        res.send(" Server is working fine");
    })

io.on("connection",(socket)=>{//after connection of client, "circuit" will be invoked and console.log("Client connected") 
    console.log("Client connected");
    
    socket.on('join',({username})=>{//"username" calling as params in "destructure" method
        users[socket.id]=username;//socket.id generates uniquely for individuals, storing username in that(now it is unique)
        // console.log(users[socket.id]);
        console.log(username,'has joined');



//in this event , I cant see the message but others do. Eg, I've joined the group , the group members will notify that I've joined but I cant see the message.
    socket.broadcast.emit('newjoin',{user:"Admin",message:`${users[socket.id]} has joined`})//-->new objet is created to pass to server-side "socket.on"
 


    socket.emit('massage',{user:"Admin",message:`welcome ${users[socket.id]} to new chat!`});//naming new "user" as "Admin" with welcome msg-->only I can see , no one can see using "emit"



    });//this "socket.on" will "listen" on the backend if the client event invoked this event to listen.
    
    socket.on('sendmsg',({message,id})=>{
        console.log(users[id]);
        console.log({message,id});
        io.emit('showmsg',{user:users[id],message,id});//the message will show all, sending user and all
    
    })
    

    //⭐⭐⭐for disconnecting
   socket.on('disconnect',() => {
    socket.broadcast.emit('left', { user:'Admin',message: `${users[socket.id]} has left` });
    console.log(`${users[socket.id]} has left`);
  });
    
 


    

})



server.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
})




//⭐ For Testing Purpose

// const port=process.env.PORT || 3000;
// const app=express();

// app.get('/',(req,res)=>{//always it will take "req" and then "res" it.
//     res.send("Hello World");
// })

// app.listen(port,()=>{
//     console.log(`Server is running on port: http://localhost:${port}`)
    
// })

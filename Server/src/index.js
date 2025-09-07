import http from 'http'
import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import cookie from 'cookie'

configDotenv();

const port=process.env.PORT || 3000;
const app=express();
app.use(cors({
    origin:process.env.CORS_URI,
    credentials:true
}));

//it was creating problem on render while deployment
// app.use(cors(
//     {
//         origin:function(origin,callback){//callback(error,allow)-->allow can be bool or string-->from the docs
//             if(!origin || cors_uri.includes(origin)){
//                 callback(null,origin);//or callback(null,true)
//             }
//             else{
//                 callback(new Error("cors denied"));
//             }
//         }
//         ,
//         credentials:true
//     }
// ));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const server =http.createServer(app);
const io = new Server(server);

app.use(
    express.urlencoded({
        extended:true,
        limit:"15kb"
    })
)
app.use(helmet());
app.use(
    rateLimit({
        windowMs:15*60*1000,//15 mins
        max:100,//max request in 15 mins
        message:"Too many requests from this IP, please try again after 15 mins"
    })
)

app.use(express.json({limit:"15kb"}));
app.use(cookieParser());

const users=[{}];

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    
};

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true}); 
        res.status(201).json({ message: 'Logged in successfully' ,
        token: token
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(204).json({ message: 'Logged out successfully' });
});

app.get('/', authenticateToken, (req, res) => {
    res.send(`Server is working fine. Welcome ${req.user.username}`);

});

io.use((socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");//unlike express we have to parse it manually in the socket.io to access the jwt token from cookies
    const token = cookies.token;
    if (!token) {
        return next(new Error('Authentication error: No token provided'));
    }
    try{
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();}catch(err){
            return next(new Error('Authentication error: Invalid token'));
        }
    
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.user.username);

    socket.on('join', () => {
        users[socket.id] = socket.user.username;
        console.log(socket.user.username, 'has joined');

        socket.broadcast.emit('newjoin', { user: "Admin", message: `${users[socket.id]} has joined` });
        socket.emit('massage', { user: "Admin", message: `welcome ${users[socket.id]} to new chat!` });
    });

    socket.on('sendmsg', ({ message, id }) => {
        console.log(users[id]);
        console.log({ message, id });
        io.emit('showmsg', { user: users[id], message, id });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', { user: 'Admin', message: `${users[socket.id]} has left` });
        console.log(`${socket.user.username} has left`);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});




//⭐ For Testing Purpose

// const port=process.env.PORT || 3000;
// const app=express();

// app.get('/',(req,res)=>{//always it will take "req" and then "res" it.
//     res.send("Hello World");
// })

// app.listen(port,()=>{
//     console.log(`Server is running on port: http://localhost:${port}`)
    
// })

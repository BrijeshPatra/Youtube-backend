import express, { json } from 'express'
import mongoose from 'mongoose'
import multer from 'multer';
import http from 'http';
import WebSocket from 'ws';
import Comment from '../models/comment.model.js'; // Ensure you import your Comment model
import authRoutes from '../routes/authroutes.js';
import videoRoutes from '../routes/videoroutes.js';
import commentRoutes from '../routes/commentroutes.js';


const app=express();

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})


//Websocket implementation
const server=http.createServer(app)
const wss=new WebSocket.Server({server})

//Connection building ws
wss.on('connection',(ws)=>{
    console.log('New client connected');

    ws.on('message',async(message)=>{
        const parsedMessage=JSON.parse(message)
        const{videoId,text,userId}=parsedMessage

        const comment=new Comment({
            text,
            video:videoId,
            user: userId
        })
        await comment.save()

        const broadcastmessage=JSON.stringify({
            videoId,
            userId,
            text
        })
        wss.clients.forEach((client)=>{
            if(client.readyState==WebSocket.OPEN){
                client.send(broadcastmessage);
            }
        })
    })
    ws.on('close',()=>{
        console.log('Client disconnected');
    })
})

//routes
app.use('/api/auth',require('./routes/authroutes'))
app.use('/api/video',require('./routes/videoroutes'))
app.use('/api/comment',require('./routes/commentroutes'))


app.listen(process.env.PORT);

server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})

export default app;
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1678022",
  key: "91c4cd7e1629db5ef996",
  secret: "fa03ee76ea0262624c4c",
  cluster: "ap2",
  useTLS: true,
});



//middleware
app.use(express.json());
app.use(cors());//set headers for us
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
// })


//DB config
const MONGO_URL =
  "mongodb+srv://whatsappadmin:9zRyVHphUy1XSlwT@cluster0.lqndhzl.mongodb.net/?retryWrites=true&w=majority";
 
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("Mongo Db connected successfully ");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change",(change)=>{
        console.log("A change done",change);

        if(change.operationType == "insert"){
            const messageDetails = change.fullDocument;

            pusher.trigger("message", "inserted", {
              name: messageDetails.name,
              message: messageDetails.message,
              timestamp: messageDetails.timestamp,
              received: messageDetails.received,
            });
        }else{
            console.log("error triggering pusher");
        }

    });
});





//api routes
app.get('/',(req,res)=>{
    res.send("Server");
});

app.get('/messages/sync',async(req,res)=>{
    await Messages.find().then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send(err);
    });
});



app.post("/messages/new", async(req, res) => {
  const dbMessage = req.body;

  await Messages.create(dbMessage)
  .then((data)=>{
    res.status(201).send(data);
  })
  .catch((err)=>{
    res.status(500).send(err);
  })

});


//listen port
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
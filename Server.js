import express from 'express';
import userRouter from './Routes/User.js'
import bodyParser from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
config();
const app = express();
app.use(bodyParser.json());

//cors error
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DElETE"],
    credentials: true
}))
//testing router
app.get("/",(req,res) => res.json({message:"Home Routes", success:true}) );

//user Router
app.use('/api/user',userRouter)

//mongo connection
mongoose.connect(process.env.MONGO_URL,{
    dbName:"Authentication",

}).then(()=> console.log("Databasae connect"))
.catch(err => console.log(err.message));


app.listen(1000,() =>console.log("Server listening",1000));
import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import bodyParser from "body-parser"
import multer, { diskStorage } from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import connectDb from "./database/connect.js"


//configuration
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app= express()

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
//File storage path
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/assets');
    },
    filename:function(req,file,cb){
        cb(ull,file.originalname);
    },
});
const upload=multer({storage})

//routes
app.use('/',(req,res)=>{
    res.send('hey Node')
})


//server
const server=()=>{
    try {
        connectDb(process.env.MONGO_URL);
        app.listen(process.env.PORT||8000,()=>{
            console.log(`server running on http://localhost:${process.env.PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
server()
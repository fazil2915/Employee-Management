import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import bodyParser from "body-parser"
import multer, { diskStorage } from "multer"
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import connectDb from "./database/connect.js"
import adminRoute from "./routes/admin.js"
import { createEmployee, updateEmployee } from './controllers/employee.js';
import { authenticateToken } from './middleware/auth.js';

//configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express()

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,        
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});

app.use(cors({
    origin: [process.env.frontend || 'http://localhost:5173'],  
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],          
    credentials: true,        
  }))
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//File storage path
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',  // The folder in Cloudinary where you want to store the files
        format: async (req, file) => {
            return file.mimetype.split('/')[1];  // Automatically set the format (e.g., 'jpg', 'png')
        },
        public_id: (req, file) => Date.now() + '-' + file.originalname, // Customize the file name
    },
});
const upload = multer({ storage })

//routes
app.use('/api/admin', adminRoute)
app.post('/api/admin/employeeRegister', authenticateToken,
    upload.single("picture"), createEmployee)
app.patch('/api/admin/updateEmployee/:employeeId', authenticateToken, upload.single("picture"),
    updateEmployee)

//server
const server = () => {
    try {
        connectDb(process.env.MONGO_URL);
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server running on http://localhost:${process.env.PORT}`);

        })
    } catch (error) {
        console.log(error);

    }
}
server()
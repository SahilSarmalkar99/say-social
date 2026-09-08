import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import videoRoutes from './routes/videoRoutes.js';
import adminVideoRoutes from './routes/adminVideoRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/api/health', (req,res)=>res.json({ok:true}));
app.use('/api/videos', videoRoutes);
app.use('/api/admin/videos', adminVideoRoutes);
app.use((err,req,res,next)=>res.status(400).json({message: err.message || 'Request failed'}));

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/video_management')
  .then(()=>app.listen(port, ()=>console.log(`Backend running on http://localhost:${port}`)))
  .catch(err=>{ console.error('MongoDB connection failed:', err.message); process.exit(1); });

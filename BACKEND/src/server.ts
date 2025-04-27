import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

const app = express()

connectDB()

// Apply cors config
app.use(cors(corsConfig))

// Read data from forms
app.use(express.json())


// route to router
app.use('/', router)

export default app
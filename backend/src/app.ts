import  { Application } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import gameRoutes from './routes/gameRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/game', gameRoutes);

export default app;

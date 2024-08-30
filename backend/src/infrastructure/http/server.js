import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from '../db/mongoose.js';
import routes from '../routes/routes.js';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import nocache from 'nocache';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

connectDB();

app.use(nocache());
app.use(cookieParser());

app.use(session({
    secret : uuidv4(),
    cookie: {maxAge: 3600000},
    resave :false,
    saveUninitialized:true
}))

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

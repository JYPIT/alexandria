import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import commentRouter from './router/comment.js';

dotenv.config();
const PORT = process.env.REACT_APP_PORT;

const app = express();

const corsOption = {
  oigin: ['http://localhost:3000'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(morgan('tiny'));
app.use(helmet());

app.use('/', commentRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500);
});

const handleListening = () => {
  console.log(`✅ Listening to http://localhost:${PORT} 🚀`);
};
app.listen(PORT, handleListening);

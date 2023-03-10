import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import booksRouter from './router/books.js';
import searchRouter from './router/search.js';
import libraryRouter from './router/library.js';
import commentRouter from './router/comment.js';
import relativeRouter from './router/relativeBook.js';
import adminRouter from './router/admin.js';

import { initSocket } from './connection/socket.js';

dotenv.config();
const PORT = process.env.REACT_APP_PORT;

const app = express();

const corsOption = {
  origin: ['http://localhost:3000'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(morgan('tiny'));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use('/assets', express.static('assets'));

app.use('/books', booksRouter);
app.use('/books', commentRouter);
app.use('/books', relativeRouter);
app.use('/search', searchRouter);
app.use('/libraries', libraryRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

const handleListening = () => {
  console.log(`✅ Listening to http://localhost:${PORT} 🚀`);
};

const server = app.listen(PORT, handleListening);

initSocket(server);

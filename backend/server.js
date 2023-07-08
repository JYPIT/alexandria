import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import csp from 'helmet-csp';

import booksRouter from './router/books.js';
import searchRouter from './router/search.js';
import libraryRouter from './router/library.js';
import commentRouter from './router/comment.js';
import relativeRouter from './router/relativeBook.js';
import adminRouter from './router/admin.js';

dotenv.config();
const PORT = parseInt(process.env.PORT) || 8080;

const app = express();

const corsOption = {
  origin: process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000',
  Credential: true,
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
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  })
);

app.use('/api/assets', express.static('assets'));

app.use('/api/books', booksRouter);
app.use('/api/books', commentRouter);
app.use('/api/books', relativeRouter);
app.use('/api/search', searchRouter);
app.use('/api/libraries', libraryRouter);
app.use('/api/admin', adminRouter);

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

app.listen(PORT, handleListening);

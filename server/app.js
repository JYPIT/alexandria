import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bookRouter from './router/book.js';
import searchRouter from './router/search.js';
import libraryRouter from './router/library.js';
import commentRouter from './router/comment.js';
import relativeRouter from './router/relativeBook.js';

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

// app.use('/', bookRouter);
app.use('/books', commentRouter);
app.use('/search', searchRouter);
app.use('/libraries', libraryRouter);
app.use('/books', relativeRouter);

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

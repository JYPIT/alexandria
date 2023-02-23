import express from 'express';

const PORT = process.env.REACT_APP_PORT;
console.log(PORT);

const app = express();

app.use((req, res, next) => {
  res.send('HELLO');
});

app.get('/', (req, res, next) => {
  res.next();
});

app.get((req, res, next) => {});
const handleListening = () => {
  console.log(`✅ Listening to http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);

import express from 'express';

const PORT = 8080;

const app = express();

app.use((req, res, next) => {
  res.send('HELLO');
});

const handleListening = () => {
  console.log(`✅ Listening to http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);

import express from 'express';
const app = express();
import { insertar, consultar } from './db.js';

app.use(express.static('static'));

app.post('/cancion', async (req, res) => {
  let data;
  req.on('data', (payload) => {
    console.log(payload);
    data = JSON.parse(payload);
    console.log(data);
  });
  req.on('end', async () => {
    const { cancion, artista, tono } = data;
    const post = await insertar(cancion, artista, tono);
    res.status(201);
    res.send(post);
  });
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));

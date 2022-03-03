import express from 'express';
const app = express();
import { insertar, consultar, eliminar, editar } from './db.js';

app.use(express.static('static'));

app.get('/canciones', async (req, res) => {
  try {
    const data = await consultar();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post('/cancion', async (req, res) => {
  try {
    let data;
    req.on('data', (payload) => {
      data = JSON.parse(payload);
    });
    req.on('end', async () => {
      const { cancion, artista, tono } = data;
      const post = await insertar(cancion, artista, tono);
      res.send(post);
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete('/cancion', async (req, res) => {
  try {
    const { id } = req.query;
    const solicitud = await eliminar(id);
    res.sendStatus(201);
    res.end();
  } catch (error) {
    console.log(error);
  }
});

app.put('/cancion', async (req, res) => {
  console.log(req.method);
  try {
    let data;
    req.on('data', (payload) => {
      console.log(payload);
      data = JSON.parse(payload);
    });
    req.on('end', async () => {
      const { cancion, artista, tono } = data;
      const put = await editar(cancion, artista, tono);
      res.sendStatus(201);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));

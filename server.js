import express from 'express';
const app = express();
import { insertar, consultar } from './db.js';

app.use(express.static('static'));

app.get('/ejercicios', async (req, res) => {
  const data = await consultar();
  res.json(data);
  res.end();
});
app.post('/ejercicios', async (req, res) => {
  let data;
  req.on('data', (payload) => {
    data = JSON.parse(payload);
  });
  req.on('end', async () => {
    const { nombre, series, repeticiones, descanso } = data;
    const post = await insertar(nombre, series, repeticiones, descanso);
    res.status(201);
    res.send(post);
  });
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));

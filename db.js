import pg from 'pg';
const { Pool } = pg;

const config = {
  user: 'postgres',
  host: 'localhost',
  password: '1234',
  database: 'repertorio',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};
// Paso 3

const pool = new Pool(config);

export async function insertar(cancion, artista, tono) {
  const client = await pool.connect();
  const res = await client.query({
    text: 'insert into repertorio (cancion, artista, tono) values ($1,$2,$3)',
    values: [cancion, artista, tono],
  });
  return res;
}

export async function consultar() {
  const client = await pool.connect();
  const res = await client.query('select * from ejercicios;');
  return res;
}

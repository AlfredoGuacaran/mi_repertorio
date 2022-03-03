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
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'insert into repertorio (cancion, artista, tono) values ($1,$2,$3)',
      values: [cancion, artista, tono],
    });
    client.release();
    return res;
  } catch (error) {
    console.log(error.code);
    return error;
  }
}

export async function consultar() {
  try {
    const client = await pool.connect();
    const res = await client.query('select * from repertorio;');
    client.release();
    return res.rows;
  } catch (error) {
    console.log(error.code);
    return error;
  }
}

export async function eliminar(id) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'DELETE from repertorio where id = $1;',
      values: [id],
    });
    client.release();
    return res.rowCount;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function editar(cancion, artista, tono) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'update repertorio set cancion = $1 , artista = $2, tono = $3 where cancion = $1',
      values: [cancion, artista, tono],
    });
    client.release();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import pool from './db.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.get('/wines_wine', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wines_wine');

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import express from 'express';
import pool from './db.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Щоб обробляти JSON у тілі запиту

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

app.post('/api/user/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO user_user (first_name, last_name, email, password, is_superuser, is_staff, is_active, date_joined) ' +
        'VALUES ($1, $2, $3, $4, false, false, true, NOW()) RETURNING *',
      [first_name, last_name, email, password],
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Database insert error:', err.message, err.stack);
    console.log('Database insert error:', err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

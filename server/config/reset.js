import 'dotenv/config' // load .env first!
import { pool } from './database.js'

// starter options for each feature
const colors = [
  ['Strawberry Milk', '#FFC1D6', 0],
  ['Baby Blue', '#BFE3FF', 0],
  ['Lavender', '#D9C7FF', 0],
  ['Mint', '#C6F1DD', 2],
  ['Butter Yellow', '#FFF2B3', 2],
  ['Black Cherry', '#5A2A3C', 3],
]

const patterns = [
  ['None', 'none', 0],
  ['Stripes', 'stripes', 2],
  ['Polka Dots', 'dots', 2],
  ['Checkers', 'checkers', 3],
  ['Hearts', 'hearts', 4],
  ['Stars', 'stars', 4],
]

const stickers = [
  ['Bow', '🎀', 1],
  ['Star', '⭐', 1],
  ['Cherry', '🍒', 1.5],
  ['Heart', '💖', 1],
  ['Cloud', '☁️', 1],
  ['Strawberry', '🍓', 1.5],
  ['Bunny', '🐰', 2],
  ['Sparkles', '✨', 1],
]

const charms = [
  ['None', '', 0],
  ['Bow', '🎀', 3],
  ['Star', '⭐', 3],
  ['Cherry', '🍒', 3],
  ['Heart', '💗', 3],
]

const resetDatabase = async () => {
  try {
    // drop custom_cases first bc it uses the others
    await pool.query(`
      DROP TABLE IF EXISTS custom_cases;
      DROP TABLE IF EXISTS base_colors;
      DROP TABLE IF EXISTS patterns;
      DROP TABLE IF EXISTS stickers;
      DROP TABLE IF EXISTS charms;
    `)

    // option tables
    await pool.query(`
      CREATE TABLE base_colors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        hex VARCHAR(7) NOT NULL,
        price NUMERIC(6,2) NOT NULL
      );
      CREATE TABLE patterns (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        type VARCHAR(20) NOT NULL,
        price NUMERIC(6,2) NOT NULL
      );
      CREATE TABLE stickers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        emoji VARCHAR(10) NOT NULL,
        price NUMERIC(6,2) NOT NULL
      );
      CREATE TABLE charms (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        emoji VARCHAR(10) NOT NULL,
        price NUMERIC(6,2) NOT NULL
      );
    `)

    // saved designs
    await pool.query(`
      CREATE TABLE custom_cases (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        case_type VARCHAR(20) NOT NULL DEFAULT 'phone',
        color_id INTEGER REFERENCES base_colors(id),
        pattern_id INTEGER REFERENCES patterns(id),
        charm_id INTEGER REFERENCES charms(id),
        stickers JSONB NOT NULL DEFAULT '[]',
        total_price NUMERIC(6,2) NOT NULL
      );
    `)

    // fill option tables
    for (const c of colors) {
      await pool.query('INSERT INTO base_colors (name, hex, price) VALUES ($1, $2, $3)', c)
    }
    for (const p of patterns) {
      await pool.query('INSERT INTO patterns (name, type, price) VALUES ($1, $2, $3)', p)
    }
    for (const s of stickers) {
      await pool.query('INSERT INTO stickers (name, emoji, price) VALUES ($1, $2, $3)', s)
    }
    for (const ch of charms) {
      await pool.query('INSERT INTO charms (name, emoji, price) VALUES ($1, $2, $3)', ch)
    }

    console.log('✅ database reset done')
  } catch (err) {
    console.error('❌ reset failed:', err)
  } finally {
    await pool.end() // close connection so script stops
  }
}

resetDatabase()
import { pool } from '../config/database.js'

// get all rows from a table
const getAll = (table) => async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM ${table} ORDER BY id ASC`)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const getColors = getAll('base_colors')
export const getPatterns = getAll('patterns')
export const getStickers = getAll('stickers')
export const getCharms = getAll('charms')
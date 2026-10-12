import { pool } from '../config/database.js'

// get all saved cases
export const getCases = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM custom_cases ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// get one case by id
export const getCase = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM custom_cases WHERE id = $1', [req.params.id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// make new case
export const createCase = async (req, res) => {
  try {
    const { name, case_type, color_id, pattern_id, charm_id, stickers, total_price } = req.body
    const results = await pool.query(
      `INSERT INTO custom_cases (name, case_type, color_id, pattern_id, charm_id, stickers, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, case_type, color_id, pattern_id, charm_id, JSON.stringify(stickers), total_price]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// update case
export const updateCase = async (req, res) => {
  try {
    const { name, case_type, color_id, pattern_id, charm_id, stickers, total_price } = req.body
    const results = await pool.query(
      `UPDATE custom_cases SET name=$1, case_type=$2, color_id=$3, pattern_id=$4,
       charm_id=$5, stickers=$6, total_price=$7 WHERE id=$8 RETURNING *`,
      [name, case_type, color_id, pattern_id, charm_id, JSON.stringify(stickers), total_price, req.params.id]
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// delete case
export const deleteCase = async (req, res) => {
  try {
    const results = await pool.query('DELETE FROM custom_cases WHERE id = $1 RETURNING *', [req.params.id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}
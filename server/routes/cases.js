import express from 'express'
import { getCases, getCase, createCase, updateCase, deleteCase } from '../controllers/cases.js'

const router = express.Router()

// case routes
router.get('/', getCases)
router.get('/:id', getCase)
router.post('/', createCase)
router.patch('/:id', updateCase)
router.delete('/:id', deleteCase)

export default router
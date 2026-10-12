import express from 'express'
import { getColors, getPatterns, getStickers, getCharms } from '../controllers/options.js'

const router = express.Router()

// option routes
router.get('/colors', getColors)
router.get('/patterns', getPatterns)
router.get('/stickers', getStickers)
router.get('/charms', getCharms)

export default router
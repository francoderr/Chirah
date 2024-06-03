import express from 'express'

import { login, signUp } from '../controllers/userController.js'
import { createReport, getReports } from '../controllers/reportController.js'

const router  = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/createReport', createReport)
router.get('/getReports', getReports)

export default router
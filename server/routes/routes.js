import express from 'express'

import { adminLogin, getUsers, login, signUp } from '../controllers/userController.js'
import { createReport, getReports } from '../controllers/reportController.js'
import { assignPost, createPost, getPosts } from '../controllers/postController.js'

const router  = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/adminLogin', adminLogin)
router.post('/createReport', createReport)
router.get('/getReports', getReports)
router.post('/createPost', createPost)
router.get('/getPosts', getPosts)
router.get('/getUsers', getUsers)
router.post('/assignPost', assignPost)

export default router
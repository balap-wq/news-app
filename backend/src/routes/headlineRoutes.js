import express from "express";
const router = express.Router();
import {getHeadlines}  from '../controllers/headlinesController.js';

router.get('/api/headlines', getHeadlines);

export default router;
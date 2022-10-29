'use strict';
import express from 'express';
import { history, index } from '../Controllers/webController';

const router = express.Router();

router.get('/', index);
router.get('/testi', history);

export default router;
'use strict';
import express from 'express';
import { history, index, redirect } from '../Controllers/webController';

const router = express.Router();


router.get('/', index);
router.get('/qr', redirect);
router.get('/testi', history);

export default router;

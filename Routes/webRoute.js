'use strict';
import express from 'express';
import { index } from '../Controllers/webController';

const router = express.Router();

router.get('/', index);

export default router;
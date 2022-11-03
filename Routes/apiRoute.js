'use strict';
import express from 'express';
import { getSpotHistory } from '../Controllers/apiController';

const router = express.Router();

router.get('/history/parkinglot/:spot', getSpotHistory);


export default router;
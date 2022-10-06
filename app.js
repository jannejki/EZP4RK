'use strict';
import express from 'express';
import path from 'path';


import webRoute from './Routes/webRoute';

const port = 3000;

(async () => {
    // express app
    const app = express();

    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', webRoute);

    app.listen(port, () => {
        console.log('listening port: ', 3000)
    })


})();
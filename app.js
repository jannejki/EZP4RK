'use strict';
// web related
import express from 'express';
import webRoute from './Routes/webRoute';
import apiRoute from './Routes/apiRoute';

// file managing
import path from 'path';
import fs from 'fs';

// firebase
import { startFirebase } from './Controllers/firebaseController';
import { startObservingParkingLot } from './Controllers/parkingLotController';

import { startWs } from './Controllers/webSocketController';

// Server
import https from 'https';
import http from 'http';
import helmet from "helmet";

const port = 3000;
const httpsPort = 8000;

const sslkey = fs.readFileSync('Keys/ssl-key.pem');
const sslcert = fs.readFileSync('Keys/ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert,
    passphrase: 'abc'
};

(async () => {
    // express app
    const app = express();
    app.use(express.static(path.join(__dirname, 'Public')));

    const connected = startFirebase();

    if (connected) {
        startObservingParkingLot();

        const server = require('http').createServer(app);
        server.listen(port, () => {
            console.log(`Server listening port ${port}`);
        });

        // websocket
        startWs(server);


        app.use('/', webRoute);
        app.use('/api', apiRoute);
        app.use(helmet());
    }

})();
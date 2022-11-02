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

const httpPort = 3000;
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

        //starting https server
        const server = https.createServer(options, app);
        startWs(server);
        server.listen(httpsPort);

        // starting http server to redirect users to https
        http.createServer(options, (req, res) => {
            res.writeHead(301, { 'Location': `https://localhost:8000${req.url}` });
            res.end();
        }).listen(httpPort);


        app.use('/', webRoute);
        app.use('/api', apiRoute);
        app.use(helmet());
    }

})();
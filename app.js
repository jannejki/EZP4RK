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

import { startHttpWs, startHttpsWs } from './Controllers/webSocketController';

// Server
import https from 'https';
import http from 'http';
import helmet from "helmet";
import dotenv from 'dotenv';

dotenv.config();

const sslkey = fs.readFileSync('Keys/ssl-key.pem');
const sslcert = fs.readFileSync('Keys/ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert,
    passphrase: 'abc'
};

(async () => {
    const httpPort = process.env.HTTP_PORT;
    const httpsPort = process.env.HTTPS_PORT;
    // express app
    const app = express();
    app.use(express.static(path.join(__dirname, 'Public')));

    const connected = startFirebase();

    if (connected) {
        startObservingParkingLot();
        let server;

        switch (process.env.NODE_ENV) {
            case 'DEVELOPMENT':

                console.log('dev');
                server = require('http').createServer(app);

                server.listen(httpsPort, () => {
                    console.log(`Server listening port ${httpsPort}`);
                });

                startHttpWs(server);
                break;

            case 'PRODUCTION':
                console.log('prod');

                //starting https server
                server = https.createServer(options, app);
                startHttpsWs(server);

                server.listen(httpsPort, () => {
                    console.log(`HTTPS Server listening port ${httpsPort}`);
                });

                http.createServer(options, (req, res) => {
                    res.writeHead(301, { 'Location': `https://152.70.178.116:${httpsPort}` });
                    res.end();

                }).listen(httpPort, () => {
                    console.log(`HTTP Server listening port ${httpPort}`);
                });

                break;
        }


        app.use('/', webRoute);
        app.use('/api', apiRoute);
        app.use(helmet());
    }

})();
'use strict';
import express from 'express';
import path from 'path';
import { startFirebase } from './Controllers/firebaseController';
import { parkingLotStatus, startObservingParkingLot } from './Controllers/parkingLotController';
import https from 'https';
import http from 'http';
import fs from 'fs';

import { startWs } from './Controllers/webSocketController';
import { addParkingLots } from './Models/parkingLotModel';
import webRoute from './Routes/webRoute';

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



    }

})();
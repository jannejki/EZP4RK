'use strict';
import express from 'express';
import path from 'path';
import { startFirebase } from './Controllers/firebaseController';
import { parkingLotStatus, startObservingParkingLot } from './Controllers/parkingLotController';
import webRoute from './Routes/webRoute';

const port = 3000;

(async () => {
    // express app
    const app = express();
    app.use(express.static(path.join(__dirname, 'Public')));

    const connected = startFirebase();

    if (connected) {
        startObservingParkingLot();
        app.use('/', webRoute);
        app.listen(port, () => {
            console.log('listening port: ', 3000)
        })

    }

})();
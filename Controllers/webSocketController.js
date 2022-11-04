import { Server } from 'socket.io';
import { parkingLotStatus } from './parkingLotController';

let _io;

const startHttpWs = (server) => {
    _io = new Server(server);


    _io.on('connection', async (socket) => {
        console.log('new client: ', socket.id);
        sendParkingLotStatus();
        socket.on('disconnect', () => { });
    });
}


const startHttpsWs = (server) => {
    const options = { /* ... */ };
    _io = require("socket.io")(server, options);


    _io.on('connection', async (socket) => {
        console.log('new client: ', socket.id);
        sendParkingLotStatus();
        socket.on('disconnect', () => { });
    });
}


const sendParkingLotStatus = async () => {
    const parkingLot = await parkingLotStatus();
    _io.emit('parkingLotStatus', parkingLot);
}


const updateParkingSpot = (parkingSpot) => {
    _io.emit('updatedParkingSpot', parkingSpot);
}


export { startHttpWs, startHttpsWs, sendParkingLotStatus, updateParkingSpot };
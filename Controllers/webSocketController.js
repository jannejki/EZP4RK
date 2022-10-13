import { Server } from 'socket.io';
import { parkingLotStatus } from './parkingLotController';

let _io;

const startWs = (server) => {
    _io = new Server(server);


    _io.on('connection', async (socket) => {
        console.log('new client');
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


export { startWs, sendParkingLotStatus, updateParkingSpot };
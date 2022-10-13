import { IosApp } from 'firebase-admin/lib/project-management/ios-app';
import { Server } from 'socket.io';
import { parkingLotStatus } from './parkingLotController';

let _io;

const startWs = (server) => {
    _io = new Server(server);


    _io.on('connection', async (socket) => {
        console.log('new client: ', socket.id);
        sendParkingLotStatus(socket.id);
        socket.on('disconnect', () => { });
    });
}


const sendParkingLotStatus = async (socket) => {
    const parkingLot = await parkingLotStatus();
    _io.to(socket).emit('parkingLotStatus', parkingLot);
}


const updateParkingSpot = (parkingSpot) => {
    _io.emit('updatedParkingSpot', parkingSpot);
}


export { startWs, sendParkingLotStatus, updateParkingSpot };
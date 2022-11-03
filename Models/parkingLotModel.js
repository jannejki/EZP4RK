'use strict';

import { firebase } from "../Controllers/firebaseController";
import { updateParkingSpot } from "../Controllers/webSocketController";
import { addHistory } from "./parkingSpotModel";


const observeParkingLot = async () => {
    const observer = firebase.collection('ParkingLot')

        .onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                if (change.type === 'modified') {
                    console.log('Modified parkingSpot: ', change.doc.id, ', data: ', change.doc.data());

                    updateParkingSpot({ name: change.doc.id, fields: change.doc.data() });
                    addHistory({ name: change.doc.id, state: change.doc.data().state });
                }
            });
        });
    console.log('Observing parking lot');
}


const getParkingLotStatus = async () => {
    const parkingLotRef = firebase.collection('ParkingLot');
    try {

        const snapshot = await parkingLotRef.get();

        const parkingLotArray = [];

        snapshot.forEach(doc => {
            parkingLotArray.push({ name: doc.id, fields: doc.data() })
        });
        return parkingLotArray;
    } catch (e) {
        throw { error: `Encountered error: ${e}`, status: 500 };
    }
}


// For configuring new database
const addParkingLots = async () => {
    const parkingLotRef = firebase.collection('History');

    for (let i = 1; i < 27; i++) {
        await parkingLotRef.doc(`Spot${i}`).set({
            inva: false,
            state: false
        });
        console.log(i);
    }
}


export {
    observeParkingLot,
    getParkingLotStatus,
    addParkingLots
}
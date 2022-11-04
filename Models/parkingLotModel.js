'use strict';

import { firebase } from "../Controllers/firebaseController";
import { updateParkingSpot } from "../Controllers/webSocketController";
import { addHistory } from "./parkingSpotModel";

const parkingLot = [];

const observeParkingLot = async () => {
    const observer = firebase.collection('ParkingLot')

        .onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                if (change.type === 'modified') {
                    console.log('Modified parkingSpot: ', change.doc.id, ', data: ', change.doc.data());

                    for (let i in parkingLot) {

                        if (parkingLot[i].name == change.doc.id) {

                            parkingLot[i] = { name: change.doc.id, fields: change.doc.data() }
                            updateParkingSpot({ name: change.doc.id, fields: change.doc.data() });
                            addHistory({ name: change.doc.id, state: change.doc.data().state });

                            break;
                        }
                    }

                }
            });
        });
    console.log('Observing parking lot');
}


const getParkingLotStatusFromFB = async () => {
    const parkingLotRef = firebase.collection('ParkingLot');
    try {

        const snapshot = await parkingLotRef.get();

        snapshot.forEach(doc => {
            parkingLot.push({ name: doc.id, fields: doc.data() })
        });
        return true;
    } catch (e) {
        throw { error: `Encountered error: ${e}`, status: 500 };
    }
}


const getParkingLotStatus = () => {
    return parkingLot;
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
    getParkingLotStatusFromFB,
    addParkingLots,
    getParkingLotStatus
}
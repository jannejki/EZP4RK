'use strict';

import { firebase } from "../Controllers/firebaseController";

const addHistory = async (spot) => {
    const historyRef = firebase.collection(`ParkingLot/${spot.name}/History`);

    await historyRef.doc().set({
        state: spot.state,
        time: new Date()
    });
}

const getHistory = async (spot) => {
    const spotRef = firebase.collection(`ParkingLot/${spot}/History`);
    try {
        const snapshot = await spotRef.get();

        const historyArray = [];

        snapshot.forEach(doc => {
            historyArray.push({ name: doc.id, fields: doc.data() })
        });



        return historyArray;

    } catch (e) {
        throw { error: `Encountered error: ${e}`, status: 500 };
    }
}

export {
    addHistory,
    getHistory
}

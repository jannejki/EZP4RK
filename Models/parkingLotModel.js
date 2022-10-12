import { firebase } from "../Controllers/firebaseController";

const observeParkingLot = () => {
    const parkingLotRef = firebase.collection('ParkingLot').doc('Spots');

    const observer = parkingLotRef.onSnapshot(docSnapshot => {
        console.log(docSnapshot._fieldsProto);
        // TODO: Päivitä websocket
    }, err => {
        throw { error: `Encountered error: ${err}`, status: 500 };
    });
}


const getParkingLotStatus = async () => {
    const parkingLotRef = firebase.collection('ParkingLot').doc('Spots');
    const doc = await parkingLotRef.get();

    if (!doc.exists) {
        console.log('parkingLotModel getParkingLotStatus: No such document!');
        throw { error: 'Collection: "ParkingLot", doc:"Spots" not found!', status: 500 };
    } else {
        return doc.data();
    }
}


export {
    observeParkingLot,
    getParkingLotStatus
}
import { getParkingLotStatus, getParkingLotStatusFromFB, observeParkingLot } from "../Models/parkingLotModel";


const startObservingParkingLot = async () => {
    try {

        observeParkingLot();
        const success = await getParkingLotStatusFromFB();
    } catch (e) {
        console.log(e);
    }
}

const parkingLotStatus = async () => {
    const parkingLot = getParkingLotStatus();
    return parkingLot;
}


export {
    startObservingParkingLot,
    parkingLotStatus
}
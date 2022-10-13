import { getParkingLotStatus, observeParkingLot } from "../Models/parkingLotModel";


const startObservingParkingLot = () => {
    observeParkingLot();
}

const parkingLotStatus = async () => {
    try {
        const parkingLot = await getParkingLotStatus();
        return parkingLot;
    } catch (err) {
        console.log(err);
    }

}


export {
    startObservingParkingLot,
    parkingLotStatus
}
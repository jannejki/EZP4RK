'use strict';

import { getHistory } from "../Models/parkingSpotModel";

const getSpotHistory = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    try {

        const history = await getHistory(req.params.spot);
        console.log(history);
    } catch (e) {
        console.log(e);
    }
    res.sendStatus(200);
}


export { getSpotHistory }
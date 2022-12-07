'use strict';

import path from "path";
import usage from "../Models/usageModel";

const index = async (req, res) => {
    console.log('sending index.html');
    res.sendFile(path.join(__dirname, '../Public/index.html'));
}

const redirect = async (req, res) => {
    // redirect to home page
    try {
        usage.increaseQR();
    } catch (err) {
        console.log(err);
    } finally {
        res.redirect('/');
    }
}

const history = async (req, res) => {
    res.send('toimii');
}

export { index, history, redirect }
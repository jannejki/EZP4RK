'use strict';

import path from "path";

const index = async (req, res) => {
    console.log('sending index.html');
    res.sendFile(path.join(__dirname, '../Public/index.html'));
}

const history = async (req, res) => {
    res.send('toimii');
}

export { index, history }
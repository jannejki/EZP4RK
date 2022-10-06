'use strict';

import path from "path";

const index = async (req, res) => {
    console.log('sending index.html');
    res.sendFile(path.join(__dirname, '../public/index.html'));
}


export { index }
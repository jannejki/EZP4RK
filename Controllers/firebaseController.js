import { initializeApp, applicationDefault, cert } from 'firebase-admin/lib/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/lib/firestore';


const serviceAccount = require('../Keys/ezp4rk-90eb3-5b0abd196841.json');
let firebase;

const startFirebase = async () => {

    try {
        initializeApp({
            credential: cert(serviceAccount)
        });
        firebase = getFirestore();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}


export { startFirebase, firebase };
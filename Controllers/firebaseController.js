import { initializeApp, applicationDefault, cert } from 'firebase-admin/lib/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/lib/firestore';


const serviceAccount = require('../Keys/ezp4rk-c11a9-5390742f3d02.json');
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
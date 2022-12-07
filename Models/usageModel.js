import { firebase } from "../Controllers/firebaseController";

const usage = {

    increaseQR: async () => {
        // get document QR from collection Usage from firestore
        const usageRef = firebase.collection('Usage').doc('QR');
        try {

            // get document data
            const doc = await usageRef.get();

            // if document exists, update it
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // increase usage by 1
                await usageRef.update({
                    loads: doc.data().loads + 1
                });
            }
        } catch (e) {
            throw { error: `Encountered error: ${e}`, status: 500 };
        }
    },
}

export default usage;

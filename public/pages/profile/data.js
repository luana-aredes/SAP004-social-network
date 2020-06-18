const storage = firebase.storage()
const db = firebase.firestore()

export const uploadPhoto = async(file, userId) => {
    const upload = await storage
        .ref("users")
        .child(userId + "/profile.jpg")
        .put(file);
    const url = `https://firebasestorage.googleapis.com/v0/b/rede-social-sap004.appspot.com/o/users%2F${userId}%2Fprofile.jpg?alt=media&${Math.random()}`
    return url;
}


export const editProfile = (userId, data) => {
    //const user = firebase.auth().currentUser;

    // user.updateProfile({
    //     displayName: name

    // }).then(function() {
    //     // Update successful.
    // }).catch(function(error) {
    //     // An error happened.
    // });

    return db.collection('users').doc(userId).set(data, { merge: true });
}

export const getUser = async(userId) => {
    const doc = await db.collection('users').doc(userId).get();
    return doc.data();
}
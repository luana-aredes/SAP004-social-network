const storage = firebase.storage()

export const uploadPhoto = async(file, userId) => {
    const upload = await storage
        .ref("users")
        .child(userId + "/profile.jpg")
        .put(file);
    const url = `https://firebasestorage.googleapis.com/v0/b/rede-social-sap004.appspot.com/o/users%2F${userId}%2Fprofile.jpg?alt=media`
    return url;
}

//criar funçao update FocusNavigationEvent.


export const editProfile = (userId, name) => {

    user.updateProfile({
        displayName: "nome editado",
    }).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });
}
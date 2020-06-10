export const loginGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            alert("você esta logado agora!");
            // ...
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
};

export const loginWithExistingEmail = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => alert("Agora voce esta logado!"))
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Senha e/ou usuário invalidos");
            // ...
        });
};
export const signOut = () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        history.pushState("", document.title, window.location.pathname);
        alert("Sessão encerrada");
    }).catch(function (error) {
        // An error happened.
    });
}
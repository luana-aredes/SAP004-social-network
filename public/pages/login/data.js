export const loginGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            alert("você esta logado agora!");
        
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
};

export const loginWithExistingEmail = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => alert("Agora voce esta logado!"))
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Senha e/ou usuário invalidos");
        
        });
};
export const signOut = () => {
    firebase.auth().signOut().then(function () {
        history.pushState("", document.title, window.location.pathname);
    }).catch(function (error) {
    });
}
export const loginGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .catch(function(error) {
            window.logErrors("Ocorreu um erro, tente novamente")
        });
};

export const loginWithExistingEmail = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {

            window.logErrors("Senha e/ou usuário invalidos")

        });
};
export const signOut = () => {
    firebase.auth().signOut().then(function() {
        history.pushState("", document.title, window.location.pathname);
    }).catch(function(error) {
        window.logErrors("Ocorreu um erro, tente novamente")
    });
}
export const loginCreateUser = (email, password) => {
    if (email.length < 6) {
        alert("Por favor, insira um email válido");
        return;
    }
    if (password.length !== 6) {
        alert("Sua senha deve conter 6 digitos");
        return;
    }
    /* firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then(() => alert("Cadastro criado com sucesso!")).then(() => sendEmailVerification())
     .catch(function (error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       alert("Verifique se o email inserido esta correto!");
     });
     */
};


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

function sendEmailVerification() {
    // [START sendemailverification]
    firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(function () {
            // Email Verification sent!
            // [START_EXCLUDE]
            alert("O link para confirmação foi enviado para seu email!");
            // [END_EXCLUDE]
        });
    // [END sendemailverification]
}

/*
function linkDirecionamentoConfirmacao(actionCodeSettings) {
  firebase
    .auth()
    .sendSignInLinkToEmail("user@example.com", actionCodeSettings)
    .then(function () {
      firebase.auth.Auth.signInWithEmailLink;
      // The link was successfully sent. Inform the user. Save the email
      // locally so you don't need to ask the user for it again if they open
      // the link on the same device.
    })
    .catch(function (error) {
      // Some error occurred, you can inspect the code: error.code
    });
}

var actionCodeSettings = {
    // The URL to redirect to for sign-in completion. This is also the deep
    // link for mobile redirects. The domain (www.example.com) for this URL
    // must be whitelisted in the Firebase Console.
    url: "https://rede-social-sap004.firebaseio.com",
    iOS: {
        bundleId: "com.example.ios",
    },
    android: {
        packageName: "com.example.android",
        installApp: true,
        minimumVersion: "12",
    },
    // This must be true.
    handleCodeInApp: true,
};

function linkDirecionamentoConfirmacao(actionCodeSettings) {
    firebase
        .auth()
        .sendSignInLinkToEmail("user@example.com", actionCodeSettings)
        .then(function() {
            firebase.auth.Auth.signInWithEmailLink;
            // The link was successfully sent. Inform the user. Save the email
            // locally so you don't need to ask the user for it again if they open
            // the link on the same device.
        })
        .catch(function(error) {
            // Some error occurred, you can inspect the code: error.code
        });
} */
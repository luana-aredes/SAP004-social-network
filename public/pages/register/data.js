export const validator = (email, password, name) => {
    if (!email.includes("@") || !email.includes(".") || email.length < 6) {

        alert("Por favor, insira um email válido");
        return;
    }
    if (password.length !== 6) {
        alert("Sua senha deve conter 6 digitos");
        return;
    }
    if (name.length < 3) {
        alert("Seu nome deve conter no mínimo 3 letras");
        return;
    }
    return true;
};

// const db = firebase.firestore();
// firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((data) => db.collection("users").doc(data.user.uid).set({
//             name: name,
//             email: email

//         })
//         .then(function() {
//             console.log("Document successfully written!");
//         })
//         .catch(function(error) {
//             console.error("Error writing document: ", error);
//         }));
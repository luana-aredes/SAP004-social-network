const db = firebase.firestore();

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

export const createLogin = async(email, password) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
            return data.user;
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        })
    return user;
};

export const createUser = async(name, email, id) => {

    db.collection("users").doc(id).set({
            name: name,
            email: email,

        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });


}
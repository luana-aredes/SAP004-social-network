const db = firebase.firestore();

export const validator = (email, password, name) => {
    if (!email.includes("@") || !email.includes(".") || email.length < 6) {

        window.logErrors("Por favor, insira um email válido");
        return;
    }
    if (password.length !== 6) {
        window.logErrors("Sua senha deve conter 6 digitos");
        return;
    }
    if (name.length < 3) {
        window.logErrors("Seu nome deve conter no mínimo 3 letras");
        return;
    }
    return true;
};

export const createLogin = async(email, password, name) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
            return data.user;
        })
        .catch(function(error) {
            window.logErrors("Ocorreu um erro, tente novamente");
        })
    await user.updateProfile({
        displayName: name
    });
    return user;
};

export const createUser = async(name, profession, place, email, id) => {

    db.collection("users").doc(id).set({
        name: name,
        profession: profession,
        place: place,
        email: email,


    })

    .catch(function(error) {
        window.logErrors("Ocorreu um erro, tente novamente");
    });


}
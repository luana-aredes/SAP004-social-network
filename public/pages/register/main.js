import {
    validator,
    createLogin,
    createUser
} from "./data.js";

export default async() => {
    const container = document.createElement('div');
    const template = ` 
<div id="register" class="container-register">
<form method="post" action="javascript:;" id="formRegister">
    <h1 class="title">Cadastro</h1>
    <div class = "register">
    <div class = "register-input">
        <label for="regName">Nome</label>
        <input id="regName" class="regInput" required="required" type="text" name="name" placeholder=" Nome completo"/>
    </div>

    <div class = "register-input">
    <label for="regProfession">Profissão</label>
    <input id="regProfession" class="regInput" required="required" type="text" name="profession"/>
    </div>

    <div class = "register-input">
    <label for="regPlace">Cidade</label>
    <input id="regPlace" class="regInput" required="required" type="text" name="place"/>
    </div>

    <div class = "register-input">
        <label for="regEmail" >E-mail</label>
        <input id="regEmail" class="regInput"  required="required" type="email" name="email" />
    </div>

    <div class = "register-input">
        <label for="regSenha">Senha</label>
        <input id="regSenha" class="regInput"  required="required" type="password" name="password" placeholder=" Senha de 6 dígitos" />
    </div>

    <div id="error"></div>

    <p>
        <input type="submit" value="Cadastrar" class="btn" id= "create-user"/>
    </p>

    <p class="link">
        Já tem conta?
        <a href="#login"> Ir para Login </a>
    </p>
</form>
</div>`
    container.innerHTML = template;
    const formRegister = container.querySelector("#formRegister")
    formRegister.addEventListener("submit", async() => {
        const formData = new FormData(formRegister);
        const email = formData.get("email");
        const name = formData.get("name");
        const profession = formData.get("profession");
        const place = formData.get("place");
        const password = formData.get("password");

        if (validator(email, password, name)) {
            window.location.hash = "";

            const user = await createLogin(email, password, name);
            console.log(user);
            createUser(name, profession, place, email, user.uid);

        };


    });
    return container;

}
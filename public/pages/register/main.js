import {
    validator,
} from "./data.js";

export default () => {
    const container = document.createElement('div');
    const template = ` 
<div id="register" class="register">
<form method="post" action="javascript:;" id="formRegister">
    <h1 class="title">Cadastro</h1>

    <p>
        <label for="regName">Nome</label>
        <input id="regName" class="regName" required="required" type="text" name="name"/>
    </p>

    <p>
        <label for="regEmail" >E-mail</label>
        <input id="regEmail" class="regEmail"  required="required" type="email" name="email" />
    </p>

    <p>
        <label for="regSenha">Senha</label>
        <input id="regSenha" class="regSenha" required="required" type="password" name="password" />
    </p>

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
    formRegister.addEventListener("submit", () => {
        const formData = new FormData(formRegister);
        const email = formData.get("email");
        const name = formData.get("name");
        const password = formData.get("password");

        if (validator(email, password, name)) {
            alert("entrou");
        };

        return

    });
    return container;

}
export default () => {
    const container = document.createElement('div');
    const template = ` 
<div id="register" class="register">
<form method="post" action="">
    <h1 class="title">Cadastro</h1>

    <p>
        <label for="regName">Nome</label>
        <input id="regName" class="regName" required="required" type="text" />
    </p>

    <p>
        <label for="regEmail" >E-mail</label>
        <input id="regEmail" class="regEmail"  required="required" type="email" />
    </p>

    <p>
        <label for="regSenha">Senha</label>
        <input id="regSenha" class="regSenha" required="required" type="password" />
    </p>

    <p>
        <input type="submit" value="Cadastrar" class="btn" />
    </p>

    <p class="link">
        Já tem conta?
        <a href="#login"> Ir para Login </a>
    </p>
</form>
</div>`
    container.innerHTML = template;
    return container;
}
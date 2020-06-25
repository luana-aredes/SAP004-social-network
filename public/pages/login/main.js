import {
  loginWithExistingEmail,
  loginGoogle,
} from "./data.js";

export default async () => {
  const container = document.createElement("div");

  const template = `
    <div class= "container-flex">
      <figure class="container-title">
        <img class="logo"src="./img/slide2.png" alt="">
      </figure>
      <div class="container-web">
        <div class="container-title" >
          <h2 class="sub-title items">Seja bem vindo(a)!!!</h2>
        </div>
        <section class="container-main">
          <div class="items">
            <input type="email" id="email" placeholder="  Digite seu e-mail:" class="input-login">
            <input type="password" id="senha" placeholder="  Digite sua senha:" class="input-login">
          </div>
          <div id="error" class="show-error" ></div>
          <div class="items">
            <button class="btn-login" id="botao-login-cadastrado">Entrar</button>
          </div>
          <div class="items">
            <p class=""> Deseja logar com...</p>
          </div>
          <div class="items">
            <button id="botao-google" class="btn-google"><i class="fab fa-google" aria-hidden="true"></i></button>
          </div>
          <a class="items" href="#register" id="botao-login"> Cadastre-se</a>
        </section>
      </div>
    </div> 
    `;

  container.innerHTML = template;

  container
    .querySelector("#botao-login-cadastrado")
    .addEventListener("click", () => {
      const email = container.querySelector("#email").value;
      const password = container.querySelector("#senha").value;
      return loginWithExistingEmail(email, password);
    });

  container.querySelector("#botao-google").addEventListener("click", () => {

    return loginGoogle();
  });

  return container;
};
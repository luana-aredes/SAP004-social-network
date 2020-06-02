 export default () => {
    const container= document.createElement("div");

    const template= `
     <figure class="container-title"><img class="logo"src="./img/img.png" alt=""></figure>
    <div class="container-title" >
    <h1 class="title items" >Titulo</h1>
    <h2 class="sub-title items">Seja bem vindo(a)!!!</h2>
    </div>
    <section class="container-main">
    <div class="items">
    <input type="E-mail" placeholder="  E-mail" class="input-login">
    <input type="Senha" placeholder="  Senha" class="input-login">
    </div>
    <div class="items">
    <button class="btn"><a href = "./#home">Entrar</a></button>
    </div>
    <div class="items">
    <p class=""> Deseja logar com...</p>
    </div>
    <div class="items">
    <button class="btn-google"><i class="fab fa-google" aria-hidden="true"></i></button>
    </div>
    <a class="items" href=""> Cadastre-se</a>
  </section>`;

  container.innerHTML=template;
  return container;
}
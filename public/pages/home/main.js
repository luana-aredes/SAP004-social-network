import {
  createPost,
  readPosts,
  deletePost
} from "./data.js";

export default () => {
  let container = document.createElement("div");
  container.innerHTML = `
      </header>
    <form action="submit" id="post">
      <textarea type="text" id="post-text" rows="10" cols="50" maxlength="500" wrap="hard" spellcheck="true" placeholder="Escreva algo para compartilhar com seus amigos!" ></textarea> 
      <button type="button"> Carregar arquivo </button>
      <button type="button"> Publico </button> 
      <button type="button"> Privado </button> 
      <button type="submit" value="button" id="publish-button" class="botao"> Publicar </button>
    </form>
    <section class="card-post" id="posts">
    </section>
    <section id="comments">
    </section>
    <button type="button"> <a href= "./#profile">Provisorio</a> </button>
    `;

  const publishBtn = container.querySelector("#publish-button");
  const postsContainer = container.querySelector("#posts");
  let texto = container.querySelector("#post-text");
  const user = firebase.auth().currentUser;
  const name = firebase.firestore().collection("users").doc(user.uid);

  /*
    Pega o nome do usuario logado (or email ou google)
    const publicadoPor = () => {
      return user.providerData.forEach(function (profile) {
        "name: " + profile.displayName;
      })
    }
  */

  publishBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createPost(user.uid, user, texto.value, name);
    texto.innerHTML = " ";
    readPosts(postTemplate);
  });


  const postTemplate = (array) => {
    postsContainer.innerHTML = array
      .map(
        (post) =>
        `
          <section id='publicacao'>
            <header>
            publicado por: ${post.nome}  ${post.id}| Publico
            <button type="button" id="botao-apagar"> ❌ </button>
            </header>
            <main>
            <textarea type="text" rows="10" cols="50" readonly > ${post.text} </textarea
            <div id="botoes">
            <button type="button" id="botao" class="botao" > 💓 </button>
            <div id="contador"> ${post.likes} </div>
            <button type="submit" id="button-comentar" class="botao"> Comentar </button>
            <button type="button" class="botao"> Editar </button>
            </div>
            </main>
          </section>    
          `
      )
      .join("");
  };

  readPosts(postTemplate);

  return container;
};
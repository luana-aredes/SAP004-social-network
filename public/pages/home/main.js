import { signOut } from "../login/data.js";

export default () => {
  let container = document.createElement("div");
  container.innerHTML = `
  <header class="header">
        <section class="headerMobile">
            <img src="images/menu-square-button_icon-icons.com_73216.png" alt="" class="menuMobile">
            

            <h1 class="title">Workbook</h1>
        </section>
        <section class="headerWeb">
            <div class="menuWeb">

            </div>
            <h1>Workbook</h1>
            <img src="images/icon-exit-png-1.png" alt="" class="logout">
        </section>
    </header>
    <form action="" id="postForm">
      <textarea type="text" rows="10" cols="50" maxlength="500" wrap="hard" spellcheck="true" placeholder="Escreva algo para compartilhar com seus amigos!" id="post-text"></textarea> 
      <button type="button"> Carregar arquivo </button>
      <button type="button"> Publico </button> 
      <button type="button"> Privado </button> 
      <button type="submit" value="botao" id="button-publicar" class="botao"> Publicar </button>
    </form>
    <section class="card-post" id="posts">
    </section>
    <section id="comments">
    </section>
    <button type="button"> <a href= "./#profile">Provisorio</a> </button>
    `;

  loadPosts(container, "#posts");

  container
    .querySelector("#postForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const text = container.querySelector("#post-text").value;
      const post = {
        text: text,
        user_id: "teste",
        likes: 0,
        comments: [],
      };

      const postsCollection = firebase.firestore().collection("posts");
      postsCollection.add(post).then((res) => {
        const text = (container.querySelector("#post-text").value = "");
      });
      loadPosts(container, "#posts");
    });

  function addPost(post) {
    let postTamplate = `

      <section class="publicacao" id='publicacao' + ${post.id}'>
        <header>
        publicado por: Id do usuario: ${
          firebase.auth().currentUser.uid
        }| Publico
        <button type="button" id="botao-apagar"> ❌ </button>
        </header>
        <main>
        <textarea type="text" rows="10" cols="50" id= > ${post.data().text} 
        </textarea
        <div id="botoes">
        <button type="button" id="botao" class="botao"> 💓 </button>
        <div id="contador"> ${post.data().likes} </div>
        <button type="submit" id="button-comentar" class="botao"> Comentar </button>
        <button type="button" class="botao"> Editar </button>
        </div>
        </main>
      </section>    
      `;
    document.querySelector("#posts").innerHTML += postTamplate;

    return postTamplate;
  }

  function loadPosts(container, idRef) {
    const postsCollection = firebase.firestore().collection("posts");
    container.querySelector(idRef).innerHTML = "Carregando...";
    postsCollection.get().then((snap) => {
      container.querySelector(idRef).innerHTML = " ";
      snap.forEach((post) => {
        addPost(post);
      });
    });
  }
  container.querySelector(".logout").addEventListener("click", () => signOut());

  return container;
};

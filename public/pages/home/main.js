import {
    greeting
} from "./data.js";

export const home = () => {
    let container = document.createElement("div");
    container.innerHTML = `
    <form action="" id="postForm">
      <textarea type="text" rows="10" cols="50" maxlength="500" wrap="hard" spellcheck="true" placeholder="Escreva algo para compartilhar com seus amigos!" id="post-text"></textarea> 
      <button type="button"> Carregar arquivo </button>
      <button type="button"> Publico </button> 
      <button type="button"> Privado </button> 
      <button type="submit" value="botao" id="button-publicar" class="botao"> Publicar </button>

    </form>
    <section id="posts">
    </section>
    <section id="comments">
    </section>
    `;

    loadPosts(container, "#posts");

    container.querySelector("#postForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const text = container.querySelector("#post-text").value;
        const post = {
            text: text,
            user_id: "idTeste",
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

    <section id="publicacao">
      <header>
      publicado por: Fulano | Publico
      <button type="button" id="botao-apagar"> ❌ </button>
      </header>
      <main>
      <div id='${post.id}' class="mensagem-postada"> ${
      post.data().text
    } </div>  
      <div class="botoes">
      <button type="button" id="botao"> 💓 </button>
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

    return container;
}
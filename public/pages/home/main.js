import {
  createPost,
  readPosts,
  likePost,
  deletePost,
  filterMyPosts,
  editPost,
  readComments,


} from "./data.js";

export default () => {
  let container = document.createElement("div");
  container.innerHTML = `
  <form action="submit" id="post">
    <textarea type="text" id="post-text" rows="10" cols="70" maxlength="500" wrap="hard" spellcheck="true" placeholder="Escreva algo para compartilhar com seus amigos!" ></textarea> 
    <button type="button" class="botao"> Carregar arquivo </button>
    <p>
    <select name="" id="privacy-type">
    <option value="publico">Publico</option>
    <option value="privado">Privado</option>
</select>
      
  </p>
          <button type="submit" value="button" id="publish-button" class="botao"> Publicar </button>
          <select name="" id="filter-posts">
          <option value="allPosts">Todos os posts</option>
          <option value="myPosts">Meus Posts</option>
    </select>

    </form>
    <section class="card-post" id="posts">
    </section>
    `;

  const publishBtn = container.querySelector("#publish-button");
  const postsContainer = container.querySelector("#posts");
  const user = firebase.auth().currentUser;


  publishBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let texto = container.querySelector("#post-text");
    const privacy = container.querySelector("#privacy-type");
    createPost(user.uid, texto.value, privacy.value);
    texto.innerHTML = " ";
    readPosts(postTemplate, user.uid);
  });


  const postTemplate = (array) => {
    postsContainer.innerHTML = array
      .map(
        (post) =>
        `
          <section id='publicacao'>
            <header>
              publicado por:${post.name} em ${post.created}|  ${post.privacy}
              <button type="button" id="${post.postId}"  class="botao-apagar"><i id="${post.postId}" class="fas fa-times"></i></button>
            </header>
            <main>
              <textarea type="text" rows="10" cols="50"  id= "${post.postId}" class="post-textoo" > ${post.text}  </textarea>
              <div id="botoes">
                <button type="button" id="${post.postId}" class="botao-like botao"> <i  id="${post.postId}"  class="fas fa-thumbs-up"></i> </button>
                <div id="contador" > ${post.likes} </div>
                <i  id="${post.postId}" class="far fa-comment-dots btn-comment"></i>
                <i class="btn-edit" class="fas fa-pencil-alt"></i>
                <div id= "comments${post.postId}"></div>
                <button type="button" class="botao"> Editar </button>
              </div>
              <div class="edit">
                <p>
                  <select name="" id= "${post.postId}"  class="privacy-typee" >
                  <option value="publico">Publico</option>
                  <option value="privado">Privado</option>
                  </select>    
                </p>
                <button type="button" value="alterar"  id="${post.postId}" class="change-button"> Salvar alterações </button>
              </div>
            </main>
          </section>    
          `
      )
      .join("");
    //readonly




    const changeButton = postsContainer.querySelectorAll(".change-button");
    changeButton.forEach((item) => {
      item.addEventListener("click", async (event) => {
        const textoPost = postsContainer.querySelector(".post-textoo");
        const privacyPost = postsContainer.querySelector(".privacy-typee");
        editPost(event, user.uid, textoPost.value, privacyPost.value);
        await readPosts(postTemplate, user.uid);
      })
    });


    const deleteBtn = postsContainer.querySelectorAll(".botao-apagar");
    deleteBtn.forEach((item) => {
      item.addEventListener("click", (event) => {
        deletePost(event, user.uid)
        readPosts(postTemplate, user.uid);
      });
    });


    let likes = postsContainer.querySelectorAll(".botao-like").forEach((item) => {
      item.addEventListener("click", (event) => {
        likePost(event).then(() => {
          readPosts(postTemplate, user.uid);
        });
      });
    });
    let comments = postsContainer.querySelectorAll('.btn-comment').forEach((item) => {
      item.addEventListener('click', (event) => {
        readComments(loadComments, event);
      });
    });
    const loadComments = (array, id) => {
      const commentsContainer = postsContainer.querySelector(`#comments${id}`);
      commentsContainer.innerHTML = array
        .map(
          (comment) => `
                <main>
                <div>
                <span>${comment.userName} em ${comment.created} | ${comment.comment}</span>
                </div>
                </main>
                
                `
        );

      const newComment = document.createElement("div");
      newComment.innerHTML = `
                <textarea type="text" rows="3" cols="30" id = "new-comment" > </textarea>
                    <button type="button" id= "${id}" class="btn-newComment"> Comentar </button>
                `
      commentsContainer.appendChild(newComment);
      const text = commentsContainer.querySelector("#new-comment")
      commentsContainer.querySelector(".btn-newComment")
        .addEventListener("click", (event) => {

          comment(text.value, user.uid, event, user.displayName);
          readPosts(postTemplate, user.uid);
        });
    };
  };

  const filterPosts = container.querySelector("#filter-posts");
  filterPosts.addEventListener("change", async (event) => {
    console.log(event.target.value);
    if (event.target.value == "myPosts") {
      const posts = await filterMyPosts(user.uid);
      postTemplate(posts);
    } else {
      readPosts(postTemplate, user.uid);

    }

  });


  readPosts(postTemplate, user.uid);

  return container;
};
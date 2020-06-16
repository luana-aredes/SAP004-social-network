import {
  createPost,
  readPosts,
  likePost,
  deletePost,
  filterMyPosts,
  readComments,
  comment
} from "./data.js";

export default () => {
  let container = document.createElement("div");
  container.innerHTML = `
  <form action="submit" id="post">
  <div class = "form-profile">
  <div class = "photos-profile">
  <img src="images/Perfil.png" alt="" class="photos">
  <div class = "profile">
  <p>Nome</p>
  <p>Profissão</p>
  </div>
  </div>
  <section class= "post">
    <textarea type="text" id="post-text" rows="10" cols="50" maxlength="500" wrap="hard" spellcheck="true" placeholder="Escreva algo para compartilhar com seus amigos!" ></textarea> 
    <div class = "post-items">
    <i class="far fa-image"></i>
    <select name="" id="privacy-type">
    <option value="publico">Publico</option>
    <option value="privado">Privado</option>
    
</select>      
          <i class="fas fa-share-alt" value="button" id="publish-button"></i>
          </div>
          </div>
        </section>
          <select name="" id="filter-posts">
          <option value="allPosts">Todos os posts</option>
          <option value="myPosts">Meus Posts</option>
    </select>
    

    </form>
    <section class="card-post" id="posts">
    </section>
    `;
    document.querySelector("body").classList.add("register-body")

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
          <div class = "template-public">
            <div class ="post-privacy">
              Publicado por: ${post.name} em ${post.created}|  ${post.privacy}
              <i id="${post.postId}" class="fas fa-times"></i>
            </div>
            <main>
              <textarea type="text" rows="10" cols="40" readonly class ="public" > ${post.text} </textarea>
              <div id="botoes" class = "btn-public">
              <div class = "btn-likes">
              <i  id="${post.postId}"  class="fas fa-thumbs-up"></i>
              <div id="contador"> ${post.likes} </div>
              </div>
                <i  id="${post.postId}" class="far fa-comment-dots btn-comment"></i>
                <i class="fas fa-edit"></i>
                <div id= "comments${post.postId}"></div>
              </div>
            </main>
          </div>
        </section>    
          `
      )
      .join("");


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
        let comments = postsContainer.querySelectorAll('.btn-comment').forEach((item) =>{
            item.addEventListener('click', (event) =>{
                readComments(loadComments, event);
            });
        });
        const loadComments = (array, id) => {
            const commentsContainer= postsContainer.querySelector(`#comments${id}`);
            commentsContainer.innerHTML = array
                .map(
                    (comment) =>`
                <main>
                <div>
                <span>${comment.userName} em ${comment.created} | ${comment.comment}</span>
                </div>
                </main>
                
                `
                );

                const newComment= document.createElement("div");
                newComment.innerHTML = `
                <textarea type="text" rows="3" cols="30" id = "new-comment" > </textarea>
                    <button type="button" id= "${id}" class="btn-newComment"> Comentar </button>
                `
                commentsContainer.appendChild(newComment);
                const text = commentsContainer.querySelector("#new-comment") 
                commentsContainer.querySelector(".btn-newComment")
                    .addEventListener("click",(event) => {
                        
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
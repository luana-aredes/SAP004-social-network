import {
    createPost,
    readPosts,
    likePost,
    readComments,
    comment
} from "./data.js";

export default () => {
    let container = document.createElement("div");
    container.innerHTML = `
    <form action="submit" id="post">
      <textarea type="text" id="post-text" rows="10" cols="50" maxlength="500" wrap="hard" spellcheck="true" placeholder="Escreva algo para compartilhar com seus amigos!" ></textarea> 
      <button type="button"> Carregar arquivo </button>
      <p>
      <select name="" id="privacy-type">
      <option value="publico">Publico</option>
      <option value="privado">Privado</option>
</select>
      
  </p>
          <button type="submit" value="button" id="publish-button" class="botao"> Publicar </button>
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
            <button type="button" id="botao-apagar"><i class="fas fa-times"></i></button>
            </header>
            <main>
            <textarea type="text" rows="10" cols="50" readonly > ${post.text} </textarea>
            <div id="botoes">
            <button type="button" id="${post.postId}" class="botao-like"> <i  id="${post.postId}"  class="fas fa-thumbs-up"></i> </button>
            <div id="contador"> ${post.likes} </div>
            <i  id="${post.postId}" class="far fa-comment-dots btn-comment"></i>
            <i class="btn-edit" class="fas fa-pencil-alt"></i>
            <div id= "comments${post.postId}"></div>
            </div>
            </main>
          </section>    
          `
            )
            .join("");

                
        let likes = postsContainer.querySelectorAll('.botao-like').forEach((item) => {
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

    readPosts(postTemplate, user.uid);

    return container;
};
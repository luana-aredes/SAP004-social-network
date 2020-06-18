import {
  createPost,
  readPosts,
  likePost,
  deletePost,
  filterMyPosts,
  editPost,
  readComments,
  comment,
  deleteComment
} from "./data.js";

export default () => {
  const user = firebase.auth().currentUser;
  let container = document.createElement("div");
  container.innerHTML = `
    
  <form action="submit" id="post">
  <div class = "form-profile">
  <div class = "photos-profile">
  <img src="images/Perfil.png" alt="" class="photos">
  <div class = "profile">
  <p>${user.displayName}</p>
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
          <i id="${post.postId}" class="fas fa-times btn-delete" ></i>
            <div class ="post-privacy">
              publicado por:${post.name} em ${post.created}|  ${post.privacy}
            </div>
            <main>
              <textarea type="text" rows="10" cols="40" class ="public" > ${post.text} </textarea>
              <div id="botoes" class = "btn-public">
                <div class = "btn-likes">
                  <i  id="${post.postId}"  class="fas fa-thumbs-up btn-like"></i>
                  <div id="contador"> ${post.likes} </div>
                </div>
                <i  id="${post.postId}" class="far fa-comment-dots btn-comment"></i>
                <i class="fas fa-edit edit-btn"></i>  
              </div>
              <div class="edit">
                <i class="far fa-image"></i>
                <select name="" id= "${post.postId}"  class="privacy-edit" >
                  <option value="publico">Publico</option>
                  <option value="privado">Privado</option>
                </select>    
                <button type="button" value="alterar"  id="${post.postId}" class="save-button-change"> Salvar alterações </button>
              </div>
              
            </main>
          </div>
        </section> 
          <div id= "comments${post.postId}"></div>
          `
      )
      .join("");


    const editRef = postsContainer.querySelector(".edit");
    editRef.classList.add("invisible")

    const buttonEdit = postsContainer.querySelectorAll(".edit-btn");
    buttonEdit.forEach((item) => {
      item.addEventListener("click", (event) => {
        editRef.classList.remove("invisible")
      })
    })


    const saveButtonChange = postsContainer.querySelectorAll(".save-button-change");
    saveButtonChange.forEach((item) => {
      item.addEventListener("click", (event) => {
        const textoPost = postsContainer.querySelector(".public");
        const privacyPost = postsContainer.querySelector(".privacy-edit");
        editPost(event, user.uid, textoPost.value, privacyPost.value);
        readPosts(postTemplate, user.uid);
      })
    });


    const deleteBtn = postsContainer.querySelectorAll(".btn-delete");
    deleteBtn.forEach((item) => {
      item.addEventListener("click", async (event) => {
        deletePost(event, user.uid)
        readPosts(postTemplate, user.uid);
      });
    });


    let likes = postsContainer.querySelectorAll(".bnt-like").forEach((item) => {
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
      commentsContainer.innerHTML = `
      <div>
      <i class="fas fa-times close-comment" ></i>
      </div>
      `
      const comments = document.createElement('div');
      comments.innerHTML = array
        .map(
          (comment) => `
                <main>
                <div>
                <span>${comment.userName} em ${comment.created} | ${comment.comment}</span>
                <button type="button" id= "${comment.comment}|${comment.created}|${comment.userId}|${comment.userName}" class="btn-newEdit"> Editar </button>
                <button type="button" id= "${comment.comment}&${comment.created}&${comment.userId}&${comment.userName}" class = "btn-newDelete" > Deletar </button>
                </div>
                </main>
                
                `
        ).join("");

      commentsContainer.appendChild(comments);
      const newComment = document.createElement("div");
      newComment.innerHTML = `
                <textarea type="text" rows="3" cols="30" id = "new-comment${id}" > </textarea>
                    <button type="button" id= "${id}" class="btn-newComment"> Comentar </button>
                `
      commentsContainer.appendChild(newComment);
      const text = commentsContainer.querySelector(`#new-comment${id}`)
      commentsContainer.querySelector(".btn-newComment")
        .addEventListener("click", (event) => {

          comment(text.value, user.uid, event, user.displayName);
          readPosts(postTemplate, user.uid);
        });

        commentsContainer.querySelector(".close-comment").addEventListener("click", (event) =>{
          readPosts(postTemplate, user.uid);
        });

        commentsContainer.querySelectorAll(".btn-newEdit").forEach((item) => {
          item.addEventListener("click",(event)=> {
            let info = event.srcElement.id.split('|');
            if(info[2] == user.uid){
              deleteComment(...info, id);
              commentsContainer.querySelector(`#new-comment${id}`).value = info[0];
            }
            else{
              alert("Voce não criou este comentário");
            }
          })
        })
        commentsContainer.querySelectorAll(".btn-newDelete").forEach((item) => {
          item.addEventListener("click",(event)=> {
            let info = event.srcElement.id.split('&');
            if(info[2] == user.uid){
              deleteComment(...info, id);
              readPosts(postTemplate, user.uid);
            }
            else{
              alert("Voce não criou este comentário");
            }
          })
        })
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
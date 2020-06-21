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
import {
    getUser
} from "./../profile/data.js";

export default async() => {
    const user = firebase.auth().currentUser;
    const userData = await getUser(user.uid)
    let container = document.createElement("div");
    container.innerHTML = `
      
<form action="submit" id="post">
  <div class = "form-profile">
  <div class = "photos-profile">
  <img src="${userData?.photo || user?.photoURL || "images/Perfil.png"}"alt="" class="photos">
  <div class = "profile">
  <p>${userData?.name || user?.displayName}</p>
  <p>${userData?.profession || ""}</p>
  </div>
  </div>
  <section class= "post">
    <textarea type="text" id="post-text" rows="10" cols="50" maxlength="500" wrap="hard" spellcheck="true" reandoly placeholder="Escreva algo para compartilhar com seus amigos!" ></textarea> 
    <div class = "post-items">
    <i class="buttons far fa-image"></i>
    <select name="" id="privacy-type" class="blue-button">
    <option value="publico">Publico</option>
    <option value="privado">Privado</option>
    
</select>      
        <i class="buttons fas fa-share-alt" value="publish" id="publish-button" ></i>
        </div>
        </div>
      </section>
        <select name="" id="filter-posts" class="blue-button" >
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
        texto.value = "";
        readPosts(postTemplate, user.uid);
    });


    const postTemplate = (array) => {
        postsContainer.innerHTML = array
            .map(
                (post) =>
                `
      <section id='publicacao'>
        <div class = "template-public">
        <div class = "post-name">
        <div>${post.name}</div>
        <div id="${post.postId}" class="btn-delete"> <i id="${post.postId}" class="buttons far fa-trash-alt btn-delete" ></i> </div>
        </div>
        <div class ="post-privacy">
          <div>em ${post.created}|  ${post.privacy}</div>
          </div>
          <main>
        <textarea type="text" rows="10" cols="40" class ="public" readonly> ${post.text} </textarea>
          <div id="botoes" class = "btn-public">
          <div class = "btn-likes"> 
          <i  id="${post.postId}"  class="buttons fas fa-thumbs-up botao-like ${(post.likes.indexOf(user.uid) == -1)? "btn-dislike":""}" ></i>
          <div id="counter-like"> ${post.likes.length} </div>
          </div>
          <div class = "btn-comment">
          <i  id="${post.postId}" class="buttons far fa-comment-dots btn-comment"></i>
          <div>${post.comments.length - 1}</div>
          </div>
            <div id="${post.postId}" class="edit-btn">  
            <i class="buttons fas fa-edit edit-btn" id="${post.postId}" ></i>
            </div>

              </div>
              <div class="edit invisible">
              <select name="" id= "${post.postId}"  class="privacy-edit blue-button" >
              <option value="publico">Publico</option>
              <option value="privado">Privado</option>
              </select>    
              <button type="button" value="alterar"  id="${post.postId}" class="save-button-change blue-button"> Salvar alterações </button>
              <button type="button" value="cancel" class="cancelEdit blue-button"> Cancelar </button>
              </div>
              </main>
              </div>
              </section>    
              <div id= "comments${post.postId}" class = "container-comments"></div>
        `
            )
            .join("");


        const editBtn = postsContainer.querySelectorAll(".edit-btn");
        editBtn.forEach((item) => {
            firebase.firestore().collection("posts").doc(item.id).get().then((doc) => {
                const post = doc.data();
                if (user.uid != post.userId) {
                    item.classList.add("invisible")
                } else {
                    item.addEventListener("click", (event) => {
                        item.parentNode.parentNode.querySelector(".edit").classList.remove("invisible");
                        item.parentNode.parentNode.querySelector(".public").readOnly = false;
                    });
                };
            });
        });


        const cancelEdit = postsContainer.querySelectorAll(".cancelEdit");
        cancelEdit.forEach((item) => {
            item.addEventListener("click", (event) => {
                item.parentNode.parentNode.querySelector(".edit").classList.add("invisible");
                item.parentNode.parentNode.querySelector(".public").readOnly = true;
            });
        });

        const saveButtonChange = postsContainer.querySelectorAll(".save-button-change");
        saveButtonChange.forEach((item) => {
            item.addEventListener("click", (event) => {
                const textoPost = item.parentNode.parentNode.querySelector(".public");
                const privacyPost = item.parentNode.parentNode.querySelector(".privacy-edit")
                editPost(event, user.uid, textoPost.value, privacyPost.value);
                readPosts(postTemplate, user.uid);
            })
        });


        const deleteBtn = postsContainer.querySelectorAll(".btn-delete");
        deleteBtn.forEach((item) => {
            firebase.firestore().collection("posts").doc(item.id).get().then((doc) => {
                const post = doc.data();
                if (user.uid != post.userId) {
                    item.classList.add("invisible")
                } else {
                    item.addEventListener("click", (event) => {
                        deletePost(event, user.uid)
                        readPosts(postTemplate, user.uid);
                    })
                };
            });
        });



        let likes = postsContainer.querySelectorAll(".botao-like").forEach((item) => {
            item.addEventListener("click", async(event) => {
                await likePost(event.srcElement.id, user.uid)
                await readPosts(postTemplate, user.uid);
            });
        });

        let comments = postsContainer.querySelectorAll('.btn-comment').forEach((item) => {
            item.addEventListener('click', (event) => {

                readComments(loadComments, event.srcElement.id);
            });
        });

        const loadComments = (array, id) => {
            const commentsContainer = postsContainer.querySelector(`#comments${id}`);
            commentsContainer.innerHTML = `
          <div class = "align-close">
          <i class="buttons fas fa-times close-comment" ></i>
          </div>
          `;
            const comments = document.createElement('div');
            comments.innerHTML = array
                .map(
                    (comment, index) => {
                        if (index == 0) {
                            return ``;
                        } else {
                            if (user.uid == comment.userId) {
                                return `
                        <section class = "container-comments">
                        <div>${comment.userName}</div>
                         <div class = "created-comment">em ${comment.created}</div>
                         <div class = "comment-comment">${comment.comment}</div>
                        <div class = "comment-btn">
                          <i class="buttons fas fa-pencil-alt btn-newEdit" id= "${comment.comment}|${comment.created}|${comment.userId}|${comment.userName}"></i>
                          <i class="buttons far fa-trash-alt btn-newDelete" id= "${comment.comment}&${comment.created}&${comment.userId}&${comment.userName}"></i>
                        </div>
                        </section>                    
                        `
                            } else {
                                return `
                    <section class = "container-comments">
                    <div>${comment.userName}</div>
                     <div>em ${comment.created}</div>
                     <div>${comment.comment}</div>
                   </section>                    
                    `
                            }
                        }
                    }).join("");
            commentsContainer.appendChild(comments);
            const newComment = document.createElement("div");
            newComment.innerHTML = `
                <textarea type="text" rows="3" cols="30" id = "new-comment${id}" > </textarea>
                    <button type="button" id= "${id}" class="btn-newComment"> Comentar </button>
                `;
            commentsContainer.appendChild(newComment);
            const text = commentsContainer.querySelector(`#new-comment${id}`)
            commentsContainer.querySelector(".btn-newComment")
                .addEventListener("click", (event) => {

                    comment(text.value, user.uid, event, user.displayName);
                    readComments(loadComments, id);
                });

            commentsContainer.querySelector(".close-comment").addEventListener("click", (event) => {
                readPosts(postTemplate, user.uid);
            });

            commentsContainer.querySelectorAll(".btn-newEdit").forEach((item) => {
                item.addEventListener("click", (event) => {
                    let info = event.srcElement.id.split('|');
                    deleteComment(...info, id);
                    commentsContainer.querySelector(`#new-comment${id}`).value = info[0];
                })
            })

            commentsContainer.querySelectorAll(".btn-newDelete").forEach((item) => {
                item.addEventListener("click", (event) => {
                    let info = event.srcElement.id.split('&');
                    deleteComment(...info, id);
                    readComments(loadComments, id);
                })
            })
        };
    };

    const filterPosts = container.querySelector("#filter-posts");
    filterPosts.addEventListener("change", async(event) => {
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
import {
    createPost,
    readPosts,
    likePost,
    deletePost,
    deletePhoto,
    filterMyPosts,
    editPost,
    readComments,
    comment,
    deleteComment,
} from "./data.js";
import {
    getUser
} from "./../profile/data.js";

export default async () => {
    const user = firebase.auth().currentUser;
    const userData = await getUser(user.uid);
    let container = document.createElement("div");

    container.innerHTML = `    
  <form action="submit" id="post">
    <div class = "form-profile">
      <div class = "photos-profile">
        <img src="${userData?.photo || user?.photoURL || "img/Perfil.png"}"alt="" class="photos">
        <div class = "profile">
          <p>${userData?.name || user?.displayName}</p>
          <p class = "edit-profile">${userData?.profession || ""}</p>
        </div>
      </div>
      <section class= "post">
        <textarea type="text" id="post-text" rows="10" cols="50" maxlength="500" wrap="hard" spellcheck="true" reandoly placeholder="Escreva algo para compartilhar com seus amigos!" ></textarea> 
        <div class="image-preview invisible">
          <h1> <progress value="0" max="100" id="uploader"> </progress> Carregando...  </h1>
          <div  class="btn-delete"> <i id="delete-photo-preview-btn" class="far fa-trash-alt btn-delete" ></i> </div>
          <img id="image-preview" src=""  width="150"  height="100"  >
        </div>
        <div class = "post-items">
          <label for="arquivo-foto"> <i class="far fa-image arquivo-foto"></i></label>
          <input type="file" value="upload" id="arquivo-foto" class="invisible">
          <select name="" id="privacy-type" class="blue-button">
            <option value="publico">Publico</option>
            <option value="privado">Privado</option>  
          </select>      
          <i class="fas fa-share-alt" value="publish" id="publish-button" ></i>
        </div>
      </section>
      <div class="mirror"></div>
    </div>
    <select name="" id="filter-posts" class="blue-button" >
      <option value="allPosts">Todos os posts</option>
      <option value="myPosts">Meus Posts</option>
    </select>
  </form>
  <section class="card-post" id="posts">
  </section>
  `;

    document.querySelector("body").classList.add("register-body");

    const publishBtn = container.querySelector("#publish-button");
    const postsContainer = container.querySelector("#posts");
    const photoFile = container.querySelector(".arquivo-foto");
    const photo = container.querySelector("#arquivo-foto");
    let image = container.querySelector(".image-preview");
    let img = container.querySelector("#image-preview");
    const uploader = container.querySelector("#uploader");
    const deletePhotoPreview = container.querySelector("#delete-photo-preview-btn");

    const printPosts = async () => {
        const print = document.getElementById("filter-posts")
        if (print && print.value == "myPosts") {
            const posts = await filterMyPosts(user.uid);
            return await postTemplate(posts);
        } else {
            return await readPosts(await postTemplate, user.uid);
        }
    }


    photoFile.addEventListener("click", () => {
        image.classList.remove("invisible");
    });


    deletePhotoPreview.addEventListener("click", () => {
        img.dataset.uid
        deletePhoto(img.dataset.uid);
        image.src = "";
        img.src = "";
        image.classList.add("invisible");
        photo.value = "";
        document.location.reload(true);
    });

    const storePhoto = () => {
        photo.addEventListener("change", (event) => {
            const fileRef = event.target.files[0];
            const ref = firebase.storage().ref("arquivosPosts");
            const uid = firebase.database().ref().push().key;
            const task = ref.child(uid).put(fileRef);

            task.on(
                "state_changed",
                function progress(snapShot) {
                    const progress = Math.round(
                        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                    );
                    uploader.value = progress;
                },
                function error(error) {
                    console.log("Ocorreu um erro", error);
                },
                async function complete() {
                    const url = await ref.child(uid).getDownloadURL();
                    img.src = url;
                    img.dataset.uid = uid;
                }
            );
        });

    };

    photoFile.addEventListener("click", () => {
        storePhoto();
    });

    publishBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        image.classList.add("invisible");
        let texto = container.querySelector("#post-text");
        const privacy = container.querySelector("#privacy-type");
        const photoFile = container.querySelector("#arquivo-foto");
        if (photoFile.files.length == "0") {
            await createPost(user.uid, texto.value, privacy.value, "", "");
            texto.value = "";
            await printPosts();
        } else {
            try {
                await createPost(user.uid, texto.value, privacy.value, img.src, img.dataset.uid);
                texto.value = "";
                await printPosts();
                photoFile.value = "";
                img.src = "";
            } catch (error) {
                console.log(error);
            }
        }

    });


    const postTemplate = async (array) => {

        postsContainer.innerHTML = array
            .map(
                (post) =>
                `
                  <section id='publicacao' class="invisible">
                      <div class="template-public">
                          <div class="post-name">
                              <div>${post.name}</div>
                              ${post.userId == user.uid ? `
                              <div id="${post.postId}" class="btn-delete"> <i id="${post.postId}" class="buttons far fa-trash-alt btn-delete"></i> </div>
                              ` : "" }
                          </div>
                          <div class="post-privacy">
                              <div>em ${post.created}| ${post.privacy}</div>
                          </div>
                          <main>
                              <div class="image-post-container"><img id="image-post" class="image-post" src="${post.photoUrl}" width="460" height="200"></div>
                              <textarea type="text" class="public" value="" rows="10" cols="20" readonly>${post.text}</textarea>
                              <div id="botoes" class="btn-public">
                                  <div class="btn-likes">
                                      <i id="${post.postId}" class="buttons fas fa-thumbs-up botao-like ${post.likes.indexOf(user.uid) == -1 ? " btn-dislike " : " "}"></i>
                                      <div id="counter-like"> ${post.likes.length} </div>
                                  </div>
                                  <div class="btn-comment">
                                      <i id="${post.postId}" class="buttons far fa-comment-dots btn-comment"></i>
                                      <div>${post.comments.length - 1}</div>
                                  </div>
                                  ${post.userId == user.uid ? `
                                  <div id="${post.postId}" class="edit-btn">
                                      <i class="buttons fas fa-edit edit-btn" id="${post.postId}"></i>
                                  </div>` : "" }
                              </div>
                              ${post.userId == user.uid ? `
                              <div class="edit invisible">
                                  <select name="" id="${post.postId}" class="privacy-edit blue-button">
                              <option value="publico">Publico</option>
                              <option value="privado">Privado</option>
                              </select>
                                  <button type="button" value="alterar" id="${post.postId}" class="save-button-change blue-button"> Salvar alterações </button>
                                  <button type="button" value="cancel" class="cancelEdit blue-button"> Cancelar </button>
                              </div>
                              ` : "" }
                          </main>
                          <div id="comments${ post.postId}" class="container-comments"></div>
                      </div>
                  </section>
                  `
            )
            .join("");

        const hideEmptyImageField = postsContainer.querySelectorAll(".image-post");
        hideEmptyImageField.forEach((item) => {
            if (item.src.length < 30) {
                item.classList.add("invisible");
            }
        });

        const editBtn = postsContainer.querySelectorAll(".edit-btn");
        editBtn.forEach((item) => {
            item.addEventListener("click", (event) => {
                item.parentNode.parentNode
                    .querySelector(".edit")
                    .classList.remove("invisible");
                item.parentNode.parentNode.querySelector(
                    ".public"
                ).readOnly = false;
            });
        })

        const cancelEdit = postsContainer.querySelectorAll(".cancelEdit");
        cancelEdit.forEach((item) => {
            item.addEventListener("click", (event) => {
                item.parentNode.parentNode
                    .querySelector(".edit")
                    .classList.add("invisible");
                item.parentNode.parentNode.querySelector(".public").readOnly = true;
            });
        });

        const saveButtonChange = postsContainer.querySelectorAll(
            ".save-button-change"
        );

        saveButtonChange.forEach((item) => {
            item.addEventListener("click", async (event) => {
                const textoPost = item.parentNode.parentNode.querySelector(".public");
                const privacyPost = item.parentNode.parentNode.querySelector(
                    ".privacy-edit"
                );
                await editPost(event, user.uid, textoPost.value, privacyPost.value);
                await printPosts();
            });
        });

        const deleteBtn = postsContainer.querySelectorAll(".btn-delete");
        deleteBtn.forEach((item) => {
            item.addEventListener("click", async (event) => {
                const post = await firebase.firestore().collection("posts").doc(item.id).get().then(doc => doc.data())
                if (post) {
                    if (post.photoUid) {
                        await deletePhoto(post.photoUid);
                    }
                    await deletePost(post.postId, user.uid);
                }
                await printPosts();
            });
        });

        let likes = postsContainer
            .querySelectorAll(".botao-like")
            .forEach((item) => {
                item.addEventListener("click", async (event) => {
                    await likePost(event.srcElement.id, user.uid);
                    await printPosts();
                });
            });

        let comments = postsContainer
            .querySelectorAll(".btn-comment")
            .forEach((item) => {
                item.addEventListener("click", (event) => {
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
            const comments = document.createElement("div");
            comments.innerHTML = array
                .map((comment, index) => {
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
                    `;
                        } else {
                            return `
                <section class = "container-comments">
                <div>${comment.userName}</div>
                 <div>em ${comment.created}</div>
                 <div>${comment.comment}</div>
               </section>                    
                `;
                        }
                    }
                })
                .join("");
            commentsContainer.appendChild(comments);
            const newComment = document.createElement("div");
            newComment.innerHTML = `
            <textarea type="text" rows="3" cols="30" id = "new-comment${id}" class = "commentNew"> </textarea>
                <button type="button" id= "${id}" class="btn-newComment"> Comentar </button>
            `;
            commentsContainer.appendChild(newComment);
            const text = commentsContainer.querySelector(`#new-comment${id}`);
            commentsContainer
                .querySelector(".btn-newComment")
                .addEventListener("click", (event) => {
                    comment(text.value, user.uid, event, user.displayName);
                    readComments(loadComments, id);
                });

            commentsContainer
                .querySelector(".close-comment")
                .addEventListener("click", (event) => {
                    printPosts();
                });

            commentsContainer.querySelectorAll(".btn-newEdit").forEach((item) => {
                item.addEventListener("click", (event) => {
                    let info = event.srcElement.id.split("|");
                    deleteComment(...info, id);
                    commentsContainer.querySelector(`#new-comment${id}`).value = info[0];
                });
            });

            commentsContainer.querySelectorAll(".btn-newDelete").forEach((item) => {
                item.addEventListener("click", (event) => {
                    let info = event.srcElement.id.split("&");
                    deleteComment(...info, id);
                    readComments(loadComments, id);
                });
            });
        };
        postsContainer.querySelector("#publicacao").classList.remove("invisible")
        postsContainer
            .querySelectorAll("#publicacao")
            .forEach((item) => {
                item.classList.remove("invisible")
            });
    };

    const filterPosts = container.querySelector("#filter-posts");
    filterPosts.addEventListener("change", async (event) => {
        printPosts();
    });

    printPosts();

    return container;
};
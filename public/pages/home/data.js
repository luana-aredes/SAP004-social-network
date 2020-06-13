export const createPost = (userId, user, texto, privacy) => {
  firebase
    .firestore()
    .collection("posts")
    .add({
      name: user.displayName,
      userId: userId,
      text: texto,
      likes: 0,
      created: new Date(),
      privacy: privacy,
      comments: [{
        userId: userId,
        created: new Date(),
        comment: "Bom dia",
      }, ],
    })
    .then(function (docRef) {
      console.log("Document written with ID:", docRef.id);
      firebase.firestore().collection("posts").doc(docRef.id).update({
        postId: docRef.id,
      });
    })
    .catch(function (error) {
      console.log("Error adding document:", error);
    });
};

export const readPosts = (callback, userId) => {
  const posts = [];
  firebase
    .firestore()
    .collection("posts")
    .where("privacy", "==", "publico")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        posts.push(doc.data());
      });
      firebase
        .firestore()
        .collection("posts")
        .where("privacy", "==", "privado")
        .where("userId", "==", userId)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            posts.push(doc.data());
          });
          callback(posts);
        });
    });
};

export const likePost = (event, likes) => {
  console.log(event.srcElement.id);
  return firebase
    .firestore()
    .collection("posts")
    .doc(event.srcElement.id)
    .get()
    .then((doc) => {
      const post = doc.data();
      const qtdAtualLikes = post.likes + 1;
      firebase.firestore().collection("posts").doc(event.srcElement.id).update({
        likes: qtdAtualLikes,
      });
    });
};

export const deletePost = (event, deletar) => {
  let target = event.target || event.srcElement;
  let id = target.deletar;
  console.log(id);
  firebase
    .firestore()
    .collection("posts")
    .doc(id)
    .delete()
    .then(() => {
      id.remove();
    });
};

/*function deletar(id) {
  const card = document.getElementById(id);
  firebase.firestore().collection('posts').doc(id).delete().then(() => {
      post.remove();
  })
};
*/

/*var target = event.target || event.srcElement;
var id = target.id


const id = event.target.dataset.id;
firebase.firestore().collection('posts').doc(id).delete()
event.target.parentElement.remove();

*/
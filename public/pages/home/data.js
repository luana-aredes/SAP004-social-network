export const createPost = (userId, texto, privacy, url, uidPhoto) => {
  firebase.firestore().collection("posts").add({
      userId: userId,
      name: firebase.auth().currentUser.displayName,
      text: texto,
      photoUrl: url,
      photoUid: uidPhoto,
      likes: [],
      created: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
      privacy: privacy,
      comments: [{
        userId: userId,
        created: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
        comment: "",
        userName: ""
      }],
    })
    .then(function (docRef) {
      console.log("Document written with ID:", docRef.id);
      firebase.firestore().collection('posts').doc(docRef.id).update({
        postId: docRef.id
      });
    })
    .catch(function (error) {
      console.log("Error adding document:", error);
    });
}



export const readPosts = (callback, userId) => {
  let posts = [];
  firebase.firestore().collection("posts").where("privacy", "==", "publico")
    .get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        posts.push(doc.data());
      });
      firebase.firestore().collection("posts").where("privacy", "==", "privado").where("userId", "==", userId)
        .get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            posts.push(doc.data());
          });
          posts = posts.sort(function (a, b) {
            if (a.created < b.created) {
              return 1;
            }
            if (a.created > b.created) {
              return -1;
            }

          })
          callback(posts);
        });
    });
};


export const likePost = (postId, userId) => {
  return firebase.firestore().collection("posts")
    .doc(postId).get().then((doc) => {
      const post = doc.data();
      let likes = post.likes || [];

      if (likes.indexOf(userId) != -1) {
        likes.splice(likes.indexOf(userId), 1);

      } else {
        likes.push(userId)
      }
      firebase.firestore().collection('posts').doc(postId)
        .update({
          likes: likes
        });
    });
};

export const comment = (text, userId, event, userName) => {
  firebase.firestore().collection('posts').doc(event.srcElement.id).update({
    comments: firebase.firestore.FieldValue.arrayUnion({
      comment: text,
      created: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
      userId: userId,
      userName: userName
    })
  });
};

export const deleteComment = (text, created, userId, userName, postId) => {
  firebase.firestore().collection('posts').doc(postId).update({
    comments: firebase.firestore.FieldValue.arrayRemove({
      comment: text,
      created: created,
      userId: userId,
      userName: userName
    })
  });
};

export const readComments = (loadComments, id) => {
  firebase.firestore().collection("posts").doc(id)
    .get().then(function (snap) {
      const post = snap.data()
      const comments = post.comments;
      loadComments(comments, id);
    });
};

export const filterMyPosts = async (userId) => {
  let posts = [];
  const querySnapshot = await firebase.firestore().collection("posts").where("userId", "==", userId).get()

  querySnapshot.forEach(function (doc) {
    posts.push(doc.data());

  });
  posts = posts.sort(function (a, b) {
    if (a.created < b.created) {
      return 1;
    }
    if (a.created > b.created) {
      return -1;
    }
  });
  return posts;

}

export const deletePost = (postId, userId) => {
  firebase.firestore().collection("posts").doc(postId).get().then((doc) => {
    const post = doc.data();
    if (userId == post.userId) {
      try {
        const deleteResult = firebase.firestore().collection("posts").doc(postId).delete();
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    }
  });
};


export const deletePhoto = (photoUid) => {
  const deleteImageResult = firebase.storage().ref('arquivosPosts').child(photoUid).delete();
}

export const editPost = (event, userId, texto, privacy) => {
  firebase.firestore().collection("posts").doc(event.srcElement.id).get().then((doc) => {
    const post = doc.data();
    if (userId == post.userId) {
      const docRef = firebase.firestore().collection("posts").doc(event.srcElement.id);
      docRef.update({
          text: texto,
          privacy: privacy,
        }).then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    };
  });
};

export const editComment = (event, text, userId) => {
  firebase.firestore().collection("post").doc(event.srcElement.id).get().then((doc) => {
    const comment = doc.data();
  })
}
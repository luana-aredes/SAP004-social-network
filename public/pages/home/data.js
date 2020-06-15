export const createPost = (userId, texto, privacy) => {
    firebase.firestore().collection("posts").add({
            userId: userId,
            name: firebase.auth().currentUser.displayName,
            text: texto,
            likes: 0,
            created: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
            privacy: privacy,
            comments: [{
                userId: userId,
                created: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
                comment: "",
                userName: ""
            }],
        })
        .then(function(docRef) {
            console.log("Document written with ID:", docRef.id);
            firebase.firestore().collection('posts').doc(docRef.id).update({ postId: docRef.id });
        })
        .catch(function(error) {
            console.log("Error adding document:", error);
        });
}


export const readPosts = (callback, userId) => {
    let posts = [];
    firebase.firestore().collection("posts").where("privacy", "==", "publico")
        .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                posts.push(doc.data());
            });
            firebase.firestore().collection("posts").where("privacy", "==", "privado").where("userId", "==", userId)
                .get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        posts.push(doc.data());
                    });
                    console.log(posts)
                    posts = posts.sort(function(a, b) {
                        console.log(a)
                        if (a.created < b.created) {
                            return 1;
                        }
                        if (a.created > b.created) {
                            return -1;
                        }

                    })
                    callback(posts);
                })
        })
}
export const likePost = (event) => {
    console.log(event.srcElement.id);
    return firebase.firestore().collection("posts")
        .doc(event.srcElement.id).get().then((doc) => {
            const post = doc.data();
            const qtdAtualLikes = post.likes + 1;
            firebase.firestore().collection('posts').doc(event.srcElement.id)
                .update({ likes: qtdAtualLikes });
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

export const readComments= (loadComments, event) =>{
    console.log(event);
    firebase.firestore().collection("posts").doc(event.srcElement.id)
        .get().then(function(snap) {
            const post= snap.data()
	        const comments = post.comments;
            loadComments(comments, event.srcElement.id);
            });
};
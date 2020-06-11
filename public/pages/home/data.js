export const createPost = (userId, texto, privacy) => {
    firebase.firestore().collection("posts").add({
            userId: userId,
            text: texto,
            likes: 0,
            created: new Date(),
            privacy: privacy,
            comments: [{
                userId: userId,
                created: new Date(),
                comment: "Bom dia"
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
    var posts = [];
    firebase.firestore().collection("posts").where("privacy", "==", "publico")
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                posts.push(doc.data());
            });
            firebase.firestore().collection("posts").where("privacy", "==", "privado").where("userId", "==", userId)
                .onSnapshot(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {

                        posts.push(doc.data());
                    });
                    callback(posts);
                })
        })
}
export const likePost = (event) => {
    console.log(event.srcElement.id);
    firebase.firestore().collection("posts")
        .doc(event.srcElement.id).get().then((doc) => {
            const post = doc.data();
            const qtdAtualLikes = post.likes + 1;
            firebase.firestore().collection('posts').doc(event.srcElement.id)
                .update({ likes: qtdAtualLikes });
        });


};


export const deletePost = () => {
    firebase.firestore().collection('posts').doc().delete().then(() => {
        post.remove();
    })
}
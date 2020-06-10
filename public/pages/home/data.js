export const createPost = (userUid, texto, name) => {
    firebase.firestore().collection("posts").add({
            userId: userUid,
            name: name,
            text: texto,
            likes: 0,
            created: new Date(),
            privacy: "publico",
            comments: [{
                userId: userUid,
                created: new Date(),
                comment: "Bom dia"
            }],
        })
        .then(function (docRef) {
            console.log("Document written with ID:", docRef.id);
        })
        .catch(function (error) {
            console.log("Error adding document:", error);
        });
}


export const readPosts = (callback) => {
    firebase.firestore().collection("posts")
        .onSnapshot(function (querySnapshot) {
            var posts = [];
            querySnapshot.forEach(function (doc) {
                posts.push(doc.data());
            });
            callback(posts);
        })
}


export const deletePost = () => {
    firebase.firestore().collection('posts').doc().delete().then(() => {
        post.remove();
    })
};
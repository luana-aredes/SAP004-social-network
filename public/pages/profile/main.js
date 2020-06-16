import {
    uploadPhoto,
    editProfile
} from "./data.js"

export default () => {

    const user = firebase.auth().currentUser;
    const container = document.createElement('div');
    const template = ` 
  
            <div class="photodiv">
            <img src="images/Perfil.png" alt="" class="photo">
            
        </div>
        <input type="file" class="photoEdit"></div>
        <div class="name">
            <h2>${user.displayName}</h2>
        </div>
        <div class="Profession">
            <h3>Profissão</h3>
        </div>
        <div class="place"></div>
        <h4>Local</h4>
        <div>
            <textarea cols="30" rows="10" placeholder="Add a bio" class="bio"></textarea>
        </div>
        <section class="buttons">
            <button class="edit">Editar Perfil</button>
            <button class="save">Salvar</button>
        </section>
        `;
    container.innerHTML = template;
    document.querySelector("body").classList.add("profile-body")

    const photoEdit = container.querySelector(".photoEdit");
    photoEdit.addEventListener("change", async(event) => {
        const file = event.target.files[0]
        const url = await uploadPhoto(file, user.uid);
        console.log(url)
    });

    const edit = container.querySelector(".edit");
    edit.addEventListener("click", (event) => {

        editProfile(user.displayName);
        console.log(user.displayName);
    });
    return container;

}
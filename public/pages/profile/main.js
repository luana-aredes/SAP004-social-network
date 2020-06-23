import {
    uploadPhoto,
    editProfile,
    getUser
} from "./data.js"

export default async() => {
    
    const user = firebase.auth().currentUser;
    const userData = await getUser(user.uid)

    const container = document.createElement('div');
    const template = ` 
  
    <form action="" id="formProfile">
            <div class="photodiv">
            <img src="${userData?.photo || user?.photoURL || "images/Perfil.png"}" alt="" class="photo">
            
        </div>
        <label for='selecao-arquivo' class = "change-photo">Alterar foto</label>
        <input type="file" id = 'selecao-arquivo'class="photoEdit">
        </div>
        <div class="name">
        <input id="regName" class="regInput" required="required" type="text" name="name" placeholder="Digite seu nome" value="${userData?.name || user?.displayName || ""}">
        </div>
        <div class="Profession">
        <input id="regProfession" class="regInput" required="required" type="text" name="profession" placeholder="Digite sua profissão" value="${userData?.profession  || ""}">
        </div>
        <div class="place"></div>
        <input id="regPlace" class="regInput" required="required" type="text" name="place" placeholder="Digite sua cidade" value="${userData?.place  || ""}"/>
        <div class = "container-bio">
            <textarea cols="30" rows="10" placeholder=" Add a bio" class="bio" name="bio">${userData?.bio  || ""}</textarea>
        </div>
        <section class="buttons">
            <button type="submit" class="save">Salvar Alterações</button>
        </section>
        </form>
        `;
    console.log(userData)
    container.innerHTML = template;
    document.querySelector("body").classList.add("profile-body")

    const photoEdit = container.querySelector(".photoEdit");
    photoEdit.addEventListener("change", async(event) => {
        const file = event.target.files[0]
        const url = await uploadPhoto(file, user.uid);
        const data = {
            photo: url,
        }
        editProfile(user.uid, data)
            window.location.reload()
    });

    const formProfile = container.querySelector("#formProfile");
    formProfile.addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = new FormData(formProfile);
        const data = {
            name: formData.get('name'),
            profession: formData.get('profession'),
            place: formData.get('place'),
            bio: formData.get('bio')
        }
        console.log(data)
        editProfile(user.uid, data)
    })


    return container;

}
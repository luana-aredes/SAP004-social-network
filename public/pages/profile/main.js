import {
    signOut
} from "../login/data.js"

export default () => {
    const container = document.createElement('div');
    const template = ` 
  
            <div class="photodiv">
            <img src="images/Perfil.png" alt="" class="photo">
            
        </div>
        <input type="file" class="photoEdit"></div>
        <div class="name">
            <h2>Nome</h2>
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
        <button type="button"> <a href= "./#home">ProvisorioHome</a> </button>
        `;

    container.innerHTML = template;
    return container;
}
import {signOut} from "../login/data.js"
export default () => {
    const container = document.createElement('div');
    const template = ` 
    <header class="header">
        <section class="headerMobile">
            <img src="images/menu-square-button_icon-icons.com_73216.png" alt="" class="menuMobile">
            <h1 class="title">Workbook</h1>
        </section>
        <section class="headerWeb">
            <div class="menuWeb">

            </div>
            <h1>Workbook</h1>
            <img src="images/icon-exit-png-1.png" alt="" class="logout">
            
        </section>
    </header>
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
        <button id="signOut"><i class="fas fa-sign-out-alt" aria-hidden="true"></i></button>`;
    container.innerHTML = template;
    container.querySelector("#signOut").addEventListener("click", () => signOut());
    return container;
}
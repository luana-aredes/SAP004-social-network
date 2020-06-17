import home from "./pages/home/main.js";
import login from "./pages/login/main.js";
import profile from "./pages/profile/main.js";
import register from "./pages/register/main.js";
import {
    signOut
} from "./pages/login/data.js"


const main = document.querySelector('#root');

const init = () => {
    firebase.auth().onAuthStateChanged(async(user) => {
        if (user) {
            console.log(user.displayName);
            if (window.location.hash != "#login") {
                main.innerHTML = `<header class="header">
                <section class="headerMobile">
                    <a href= "./#profile" id= "btn-menu"><i class="fas fa-bars"></i></a>
                    <h1 class="header-title">SpaceJobs</h1>
                    <i id= "btn-signOut" class="fas fa-sign-out-alt logout"></i>
                </section>
                <section class="headerWeb">
                    <div class="menuWeb"> 
                    <a class= "menu-profile" href= "./#profile">Profile</a>
                    <a href= "./#home">Feed</a>
                    </div>
                    </div>
                    <h1 class= "title-web">SpaceJobs</h1>
                    <i id= "btn-signOut-web" class="fas fa-sign-out-alt logout"></i>
                    
                </section>
            </header>`

                main.querySelector("#btn-signOut").addEventListener("click", () => signOut());
                main.querySelector("#btn-signOut-web").addEventListener("click", () => signOut());
            }
            switch (window.location.hash) {
                case "#home":
                    main.appendChild(home());
                    break;
                case "#profile":
                    main.appendChild(await profile());
                    break;
                case "#login":
                    main.appendChild(login());
                    break;
                default:
                    main.appendChild(home());
            }
        } else {
            main.innerHTML = ""
            switch (window.location.hash) {
                case '#register':
                    main.appendChild(register());
                    break;
                default:
                    main.appendChild(login());
            }
        }
    });
}
window.addEventListener("load", () => {
    main.appendChild(login());
    init();
});

window.addEventListener("hashchange", () => {
    init();
});
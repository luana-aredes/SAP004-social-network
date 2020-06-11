import home from "./pages/home/main.js";
import login from "./pages/login/main.js";
import profile from "./pages/profile/main.js";
import register from "./pages/register/main.js";
import {
    signOut
} from "./pages/login/data.js"


const main = document.querySelector('#root');

const init = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.displayName);
            main.innerHTML = `<header class="header">
            <section class="headerMobile">
                <i class="fas fa-bars"></i>
                <h1 class="title">SpaceJobs</h1>
                <i class="fas fa-sign-out-alt logout"></i>
            </section>
            <section class="headerWeb">
                <div class="menuWeb"> 
                <a href= "./#profile">${user.displayName}</a>
                <i class="fas fa-caret-down"></i>
                </div>
                              
                    </div>
                <h1>SpaceJobs</h1>
                <button id="botao-google" class="btn-singOut"><i class="fas fa-sign-out-alt logout"></i></button>
                
                            </section>
        </header>`

            main.querySelector(".btn-singOut").addEventListener("click", () => signOut());

            switch (window.location.hash) {
                case "#home":
                    main.appendChild(home());
                    break;
                case "#profile":
                    main.appendChild(profile());
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
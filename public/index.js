import home from "./pages/home/main.js";
import login from "./pages/login/main.js";
import profile from "./pages/profile/main.js";
import register from "./pages/register/main.js";
import { signOut } from "./pages/login/data.js"


const main = document.querySelector('#root');

const init = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.displayName);
            main.innerHTML = `<header class="header">
            <section class="headerMobile">
                <img src="images/menu-square-button_icon-icons.com_73216.png" alt="" class="menuMobile">
                <h1 class="title">Workbook</h1>
            </section>
            <section class="headerWeb">
                <div class="menuWeb">
                ${user.displayName}
                <i class="fas fa-caret-down"></i>
                
                    </div>
                <h1>SpaceJobs</h1>
                <i class="fas fa-sign-out-alt logout"></i>
                            </section>
        </header>`

            main.querySelector(".logout").addEventListener("click", () => signOut());

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
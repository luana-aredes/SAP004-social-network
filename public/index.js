import home from "./pages/home/main.js";
import login from "./pages/login/main.js";
import profile from "./pages/profile/main.js";
import register from "./pages/register/main.js";

const main = document.querySelector('#root');

const init = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {            
            console.log(user.email);
            main.innerHTML = ""
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
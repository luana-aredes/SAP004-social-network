import home from "./pages/home/main.js";
import login from "./pages/login/main.js";
import profile from "./pages/profile/main.js";
import register from "./pages/register/main.js";

const main = document.querySelector("#root");

const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = "";
        switch (window.location.hash) {
            case " ":
                main.appendChild(login());
                break;
            case "#home":
                main.appendChild(home());
                break;
            case "#profile":
                main.appendChild(profile());
                break;
            case "#register":
                main.appendChild(register());
                break;
            default:
                main.appendChild(login());
        }
    });
};
window.addEventListener("load", () => {
    main.appendChild(login());
    init();
});
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
      if (window.location.hash != "#login") {
        main.innerHTML =
          `<header class="header">
            <section class="headerMobile">
              <label for="toggle-1"><i id="btn-men" class="fas fa-bars"></i></label>
              <h1 class="header-title">SpaceJobs</h1>
            </section>
            <input type="checkbox" id="toggle-1">
            <nav class="menu-mobile invisible" id="mostra" > 
             <ul> <a class= "menu-profile" href= "./#profile">Profile</a> </ul>
             <ul> <a href= "./#home">Feed</a> </ul>
             <ul> <i id= "btn-signOut" class="fas fa-sign-out-alt logout"> Sair </i> </ul>
            </nav>
            <section class="headerWeb">
              <div class="menuWeb"> 
                <a class= "menu-profile" href= "./#profile">Profile</a>
                <a href= "./#home">Feed</a>
              </div>
              <h1 class= "title-web">SpaceJobs</h1>
              <i id= "btn-signOut-web" class="fas fa-sign-out-alt logout"></i>        
            </section>
          </header>`



        main.querySelector("#btn-men").addEventListener("click", () => {
          main.querySelector(".menu-mobile").classList.remove("invisible");
          main.querySelector(".menu-mobile").classList.add("nav");

        })
        main.querySelector("#btn-signOut").addEventListener("click", () => signOut());
        main.querySelector("#btn-signOut-web").addEventListener("click", () => signOut());


      }
      switch (window.location.hash) {
        case "#home":
          main.appendChild(home());
          break;
        case "#profile":
          main.appendChild(profile());
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
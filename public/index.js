// Este é o ponto de entrada de sua aplicação
import {
    home
} from "./pages/home/main.js";

import profile from './pages/profile/main.js';
import login  from './pages/login.js'; 

document.querySelector("#root").appendChild(home());



document.querySelector('#root').appendChild(login());

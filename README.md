oi# Criando uma Rede Social

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
* [4. Considerações gerais](#4-considerações-gerais)
* [5. Entrega](#5-entrega)
* [6. Guias, dicas e leituras
  complementares](#6-guias-dicas-e-leituras-complementares)

***

## 1. Prefácio

Instagram, Snapchat, Twitter, Facebook, Twitch, Linkedin, etc. As redes sociais
invadiram nossas vidas. Nós as amamos ou odiamos, e muitas pessoas não conseguem
viver sem elas.

Há redes sociais de todo tipo para todos os tipos de interesse. Por exemplo: em
uma rodada de financiamento com investidores, foi apresentada uma rede social
para químicos onde os usuários podem publicar artigos a respeito de suas
pesquisas, comentar os artigos de seus colegas e filtrar artigos de acordo com
determinadas tags ou popularidade, mais recente ou mais comentado.

## 2. Resumo do projeto

Neste projeto você construirá uma rede social, cuja temática deixaremos ao seu critério.

Aqui estão algumas ideias:

- Alimentação
- Feminismo
- Educação
- Saúde
- Energias Renováveis

As **caraterísticas técnicas** de sua aplicação serão:
- Deve ser uma Single-Page Application [SPA](https://dzone.com/articles/how-single-page-web-applications-actually-work)
- Deve ser desenhada com enfoque [mobile first](https://darwindigital.com/mobile-first-versus-responsive-web-design/)
- Deve permitir a persistência de dados

Em sua aplicação você usará *HTML5*, *CCS3* ou *SASS*, *JavaScript(ES6+)*, *Firebase* ou *LocalStorage*

## 3. Objetivos de aprendizagem

O objetivo principal de aprendizagem deste projeto é construir uma [Single-page
Application
(SPA)](https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica)
[_responsiva_](https://github.com/Laboratoria/curricula-js/tree/master/topics/css/02-responsive)
(com mais de uma tela/ página) na qual seja possível **ler e escrever dados.**

### HTML e CSS

* [ ] [HTML
  semântico](https://developer.mozilla.org/pt-BR/docs/Glossario/Semantica)
* [ ] [CSS `flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [ ] Construir sua aplicação respeitando o protótipo.

### DOM e Web APIs

* [ ] [Manipulação do
  DOM](https://developer.mozilla.org/pt-BR/docs/DOM/Referencia_do_DOM/Introdu%C3%A7%C3%A3o)
* [ ] [History
  API](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API)
* [ ]
  [`localStorage`](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/Window.localStorage)

### Javascript

* [ ] [Uso de
  callbacks](https://developer.mozilla.org/pt-BR/docs/Glossario/Callback_function)
* [ ] [Consumo de
  Promises](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [ ] Uso de ES modules
  ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
  |
  [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))

### Firebase

* [ ] [Firestore](https://firebase.google.com/docs/firestore)
* [ ] [Firebase Auth](https://firebase.google.com/docs/auth/web/start)
* [ ] [Uso de
  onSnapshot](https://firebase.google.com/docs/firestore/query-data/listen) |
  [onAuthStateChanged](https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data)
* [ ] Firebase Hosting

### Testing

* [ ] [Teste unitários](https://jestjs.io/docs/pt-BR/getting-started)
* [ ] [Testes assíncronos](https://jestjs.io/docs/pt-BR/asynchronous)
* [ ] [Mocking](https://jestjs.io/docs/pt-BR/manual-mocks)

### Git e Github

* [ ] Colaboração pelo Github
* [ ] Organização pelo Github

### Boas práticas de programação

* [ ] Modularização
* [ ] Nomenclatura / Semântica
* [ ] Linting

***

## 4. Considerações gerais

* Este projeto deve ser desenvolvido em equipes de 3 integrantes.

* A duração proposta do projeto é de **3 sprints**, com duração de uma semana cada uma.

* Te daremos as **histórias de usuário** com o fim de apresentar a vocês os requisitos e funcionalidades que o usuário deseja.

* O **planejamento é vital**, para ele te recomendamos utilizar o trello, para que possa **escrever suas Definições de Pronto** e **Critérios de Aceitação** para cada história de usuário com o objetivo de determinar, em equipe, **o que fazer** no sprint e **como realizar**.

* Para que todos os membros de sua equipe possam alcançar os objetivos de aprendizagem, vocês deverão determinar qual será a estratégia de desenvolvimento que usarão: divisão por sub-histórias, pair programming, code reviews, etc.

### Planejamento

* Escrever, de maneira colaborativa, as **Definições de pronto** e **Critérios de Aceitação** para cada **História de usuário** que te daremos para este projeto e que deverá considerar em seu planejamento.

* **Priorizar** a implementação de suas funcionalidades, levando em conta o esforço que demandam em relação ao valor que elas têm para o usuário, e executar, em equipe, todas as histórias de usuário dentro do tempo estimado para cada sprint. Levem em conta que ao final de cada sprint deverão ser entregues publicações completamente funcionais.

* Adquirir disciplina na completude, terminando uma história de usuário antes de passar para a seguinte (ou seja, que cumpre com as *Definições de Pronto* e *Critérios de Aceitação* contemplando todos os pontos que são objetivos de aprendizagem para este projeto).

## Restrições Técnicas

* Devem utilizar `flexbox` para posicionar seus elementos. Não está permitido o uso de frameworks de CSS (bootstrap), nem de estilização com `float`.

* Já te demos o layout das telas mobile e desktop. Queremos que repliquem estas telas. O conteúdo, paleta de cores e fontes, depende da temática que vão eleger como equipe. A implementação deste layout deverá ser parte da definição de pronto de suas histórias de usuário.

## Histórias de Usuário

* Como usuário novo, devo poder criar uma conta com email e senha válidos para poder iniciar uma sessão e ingressar na Rede Social.

* Como usuário novo, devo poder ter a opção de iniciar sessão com minha conta do Google para ingressar na Rede Social sem necessidade de criar uma conta de email válido.

* Como usuário logado devo poder criar, guardar, modificar no mesmo lugar (in place) e deletar publicações (post) privadas ou públicas.

* Como usuário logado devo poder ver todos os posts públicos e privados que criei até o momento, do mais recente para o mais antigo, assim como a opção de trocar a configuração de privacidade dos meus posts.

* Eu como usuário logado, posso dar like e ver a contagem de likes em minhas publicações

* Eu como usuário logado, posso escrever, salvar, editar ou deletar um comentário em minhas publicações.

* Ao final devo poder ingressar na Rede Social e poder visualizar os dados de meu perfil criado e editá-los.

* Te deixamos um exemplo de como definir critérios de aceitação e definições de pronto para uma H.U.

    > Como usuário novo devo poder criar uma conta com email e senha para poder
    > iniciar sessão.
    > **Critérios de aceitação**
    > - Se o email ou senha não forem válidos, ao momento de logar, devo ver uma
    >   mensagem de erro.
    > - Deve ser visível se existir alguma mensagem de erro.
    > - Devo poder ver esta página de registro em celulares e desktop (responsive).
    > - Não devo necessitar recarregar a página para criar uma conta (SPA).
    >
    > **Definição de pronto**
    > - A funcionalidade cumpre e satisfaz os critérios de aceitação.
    > - O layout está de acordo com o protótipo.
    > - O código desta funcionalidade recebeu code review.
    > - A funcionalidade está publicada para ser testada.
    > - A funcionalidade foi testada manualmente.
    > - Foram feitos testes de usabilidade e foi implementado o feedback, se for
    > necessário

### Desenvolvimento FrontEnd

#### Tecnologias HTML5 e CSS3/SASS

* Aplicar HTML5 semântico em seu projeto.
* Aplicar e reforçar os conceitos fundamentais de CSS3.
* Implemetar seletores de classe evitando a redundância de estilos CSS3.
* Utilizar `flexbox` para alcançar o desenho `mobile first`, implementando um layout que se adapte a **mobile e desktop**

A seguir, te passaremos o layout da tela mobile e desktop que você deverá replicar visualmente e cujo conteúdo, cores e fontes de texto deixaremos a seu critério.

* Tela mobile

    ![mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png)

* Tela Desktop

    ![desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png)

#### JavaScript (ES6+)

* Utilizar módulos de ES6 para poder modularizar seu código JavaScript.
* Reforçar seu conhecimento sobre o uso de Template strings.
* Reforçar seu conhecimento da manipulação de DOM através do JavaSript.
* Implementar um sistema de rotas (sem uso de bibliotecas externas) para trocar de uma tela para outra de maneira dinâmica (SPA).

### Persistência de dados

Nos projetos anteriores só consumimos (lemos) dados, por exemplo, através de um arquivo `json` ou utilizando `fetch`.

Neste projeto você desenhará a estrutura destes dados, a forma de consultá-los, atualizá-los, modificá-los e eliminá-los segundo os requerimentos do usuário. Para isto você utilizará `Firestore` do `Firebase` ou `LocalStorage` uma `Web Storage API`.

#### Firebase

O objetivo de usar Firebase neste projeto é que, com ele, você aprederá a manipular e persistir dados através de um banco de dados não relacional, em tempo real e poderá implementar operações CRUD (Criação, Leitura, Atualização e Remoção) de dados.

### Considerações técnicas sobre front-end

* Separar a manipulação do DOM da lógica (separação de responsabilidades).
* Ter várias telas. Para isso, seu aplicativo deve ser um [Single Page
  Application
  (SPA)](https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica)
* Alterar e persistir dados. Os dados que você adiciona ou modifica devem
  persistir por todo o aplicativo. Recomendamos que você use o
  [Firebase](https://firebase.google.com/) para isso também.

### Testes unitários

* Lembre-se de que não há _setup_ de **testes** definido, isso dependerá da
  estrutura do seu projeto. Você não deve esquecer de pensar sobre os testes.
  Eles podem ajudar a definir a estrutura e sua lógica.

* Os testes de unidade devem cobrir no mínimo 70% de _statements_, _functions_,
  _lines_ e _branches_.

## 5. Entrega

O projeto será entregue subindo seu código no GitHub (`commit` /`push`) e a
interface será hospedada usando Firebase Hosting.

***

## 6. Guias, dicas e leituras complementares

### Mobile first

O conceito de [_mobile
first_](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/) faz
referência a um processo de desenho e desenvolvimento que parte de como se vê e
como funciona uma aplicação primeiro em um dispositivo móvel e mais adiante se
analisa como adaptar a aplicação à telas progressivamente maiores. Esta é uma
contraposição ao modelo tradicional, no qual primeiro se desenha os websites (ou
webapps) para desktops e depois os adaptam para telas menores.

A motivação aqui é se assegurar que desde o começo sejam desenhadas telas
_responsivas_. Dessa forma, começamos com a aparência e o comportamento do
aplicativo em uma tela e ambiente móvel.

### Múltiplas telas

Em projetos anteriores, nossas aplicações eram compostas de apenas uma tela
_principal_ (uma só _página_). Neste projeto, precisaremos dividir nossa
interface em várias _views_ ou _pages_ e oferecer uma maneira de navegar entre
essas telas. Esse problema pode ser resolvido de várias maneiras: com arquivos
HTML independentes (cada um com seu próprio URL) e links tradicionais; mantendo
na memória e renderizando condicionalmente (sem atualizar a página);
[manipulando o histórico do
navegador](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_na_gador)
com
[`window.history`](https://developer.mozilla.org/es/docs/Web/API/Window/history).
Neste projeto, convidamos você a explorar opções e decidir sobre uma opção de
implementação.

### Manipulação de dados

Nos projetos anteriores, consumimos dados, mas ainda não tínhamos escrito dados
(salvar alterações, criar dados, excluir, etc). Neste projeto, você precisará
criar (salvar) novos dados, além de ler, atualizar e modificar os dados
existentes. Esses dados podem ser salvos remotamente usando o
[Firebase](https://firebase.google.com/).

### CSS

Neste projeto queremos que ganhe confiança e experiência com CSS, para isso usará [`flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) para posicionar seus elementos.

Recorde que não poderá usar frameworks CSS, somente *css* ou [*sass*](https://sass-lang.com/).

Outras:

* [Mobile
  First](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/)
* [Mobile First - ZURB](https://zurb.com/word/mobile-first)
* [Mobile First Is NOT Mobile Only - Nielsen Norman
  Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
* [Criando uma SPA com Javascript - Vídeo Palomita](https://www.youtube.com/watch?v=hf8x3A1e57Y)
* [Firebase Hosting do Zero - Vídeo Dani](https://www.youtube.com/watch?v=0R2Ur0xKNz4&t=11s)
* [Firebase Hosting em Detalhes - Vídeo Evelyn](https://www.youtube.com/watch?v=fFlukPB0RLU)
* [Firebase Firestore do Zero - Vídeo Dani](https://www.youtube.com/watch?v=y-p8G3hPrMI)
* [Anatomia de um teste em Javascript - Artigo Gabriel](https://gabrieluizramos.com.br/anatomia-de-um-teste-em-javascript)
* [Entendendo async em Javascript  - Vídeo Palomita](https://www.youtube.com/watch?v=6YunRmg9orI)
* [Flexbox - CSS
  Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Flexbox - Vídeo Juliana Amoasei](https://www.youtube.com/watch?v=XvwCsQGjNy0&feature=youtu.be)
* [Módulos:
  Export](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export)
* [Módulos:
  Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
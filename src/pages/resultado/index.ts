import { state } from "../../state";

const backgroundWin = require("url:../../img/winBackground.png");
const backgroundLose = require("url:../../img/loseBackground.png");

function getData() {
  const currentState = state.getState();
  const currentGame = currentState.currentGame;
  const whoWins = state.whoWins(currentGame.myPlay, currentGame.computerPlay);
  const history = JSON.parse(localStorage.getItem("saved"));

  var countYou = history.filter((element) => {
    return element.whowins == "you";
  });
  var countComputer = history.filter((element) => {
    return element.whowins == "computadora";
  });

  const result = {
    whoWins,
    countYou,
    countComputer,
  };

  return result;
}

export function pageResultado(params) {
  const object = getData();
  state.setMove({ myPlay: "", computerPlay: "" }, "");
  const style = document.createElement("style");
  style.innerHTML = `
  .all{
    height:100vh;
    background-image : ${
      object.whoWins == "you" ? "url('backgroundWin')" : "url('backgroundLose')"
    };
  }
  .score{
    width:259px;
    height:217px;
    border: 10px solid #000000;
    border-radius: 10px;
    margin:14px auto;
    font-family: 'Odibee Sans', cursive;
  }

  .title{
    font-size:55px;
    margin:0;
    text-align:center;
    font-weight: normal;
  }

  .subtitle{
    font-size:45px;
    font-weight:normal;
    margin:3px 15px;
    text-align:right;
  }
  
  `;

  var countYou = object.countYou.length;
  var countComputer = object.countComputer.length;
  const div = document.createElement("div");
  div.className = "all";
  div.style.backgroundImage =
    object.whoWins == "you"
      ? `url('${backgroundWin}'`
      : `url('${backgroundLose}'`;
  if (object.whoWins == "you") {
    div.innerHTML = `
    <result-component who="win"></result-component>
    <div class="score">
    <h2 class="title">Score</h2>
    <h3 class="subtitle you">Vos:${countYou}</h3>
    <h3 class="subtitle computer">Computadora:${countComputer}</h3>
    </div>
    <button-component value="Volver a jugar"></button-component>
    `;
    countYou++;
  } else if (object.whoWins == "computadora") {
    div.innerHTML = `
    <result-component who="loser"></result-component>
    <div class="score">
    <h2 class="title">Score</h2>
    <h3 class="subtitle you">Vos:${countYou}</h3>
    <h3 class="subtitle computer">Computadora:${countComputer}</h3>
    </div>
    <button-component value="Volver a jugar"></button-component>
    `;
    countComputer++;
  } else {
    div.innerHTML = `
    <result-component who="empate"></result-component>
    <div class="score">
    <h2 class="title">Score</h2>
    <h3 class="subtitle you">Vos:${countYou}</h3>
    <h3 class="subtitle computer">Computadora:${countComputer}</h3>
    </div>
    <button-component value="Volver a jugar"></button-component>
    `;
  }

  div.appendChild(style);
  const button = div.querySelector("button-component");

  button.addEventListener("click", () => {
    params.goTo("/como-jugar");
  });

  return div;
}

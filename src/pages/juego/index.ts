import { state } from "../../state";

function changePage(div, params) {
  div.style.width = "";
  div.style.position = "";
  const currentMove = state.getState().currentGame;
  if (currentMove.myPlay == "" && currentMove.computerPlay == "") {
    params.goTo("/inicio");
  } else {
    div.innerHTML = `
    <div class="container-play">
      <hand-component jugada=${currentMove.myPlay} size="big-big" play="myplay" class="${currentMove.myPlay}"></hand-component>
      <hand-component jugada=${currentMove.computerPlay} size="big-big" play="computer" class="${currentMove.computerPlay}"></hand-component>
    </div>
      `;

    setTimeout(() => {
      params.goTo("/resultado");
    }, 1600);
  }
}

function move(div) {
  const moves = ["tijera", "papel", "piedra"];
  const components = div.querySelectorAll("hand-component");
  for (const c of components) {
    c.addEventListener("change", (e: any) => {
      const myMove = e.detail.jugada;
      const randomPosition = Math.floor(Math.random() * 3);
      const computerMove = moves[randomPosition];
      const jugada = c.shadowRoot.querySelector(`.${e.detail.jugada}`);
      jugada.style.top = "350px";
      const whoWins = state.whoWins(myMove, computerMove);

      state.setMove({ myPlay: myMove, computerPlay: computerMove }, whoWins);
    });
  }
}

export function pageJuego(params) {
  const div = document.createElement("div");
  div.innerHTML = `
    <contador-component></contador-component>
    <div class="container-hands">
      <hand-component jugada="tijera" size="big" class="tijera"></hand-component>
      <hand-component jugada="piedra" size="big" class="piedra"></hand-component>
      <hand-component jugada="papel" size="big" class="papel"></hand-component>
    </div>  
  `;
  const container = div.querySelector(".container-hands");
  div.style.width = "375px";
  div.style.position = "absolute";
  move(div);

  setTimeout(() => {
    changePage(div, params);
  }, 3400);

  return div;
}

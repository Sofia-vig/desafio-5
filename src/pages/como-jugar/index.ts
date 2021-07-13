export function pageComoJugar(params) {
  const div = document.createElement("div");
  div.innerHTML = `
    <text-component tag="p">
        Presioná jugar
        y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
    </text-component>
    <button-component value="¡Jugar!"></button-component>
    <div class="container-hands">
      <hand-component jugada="tijera"></hand-component>
      <hand-component jugada="piedra"></hand-component>
      <hand-component jugada="papel"></hand-component>
    </div>  
      `;

  const container = div.querySelector(".container-hands");
  div.style.width = "365px";
  div.style.position = "absolute";

  const shadow = div.querySelector("button-component").shadowRoot;
  const button = shadow.querySelector(".button");

  button.addEventListener("click", () => {
    params.goTo("/jugar");
  });

  return div;
}

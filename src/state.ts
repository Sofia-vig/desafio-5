const state = {
  data: {
    currentGame: {
      myPlay: "",
      computerPlay: "",
    },
    history: JSON.parse(localStorage.getItem("saved")) || [],
  },

  getScore() {
    const history = JSON.parse(localStorage.getItem("saved"));
    var computer = 0;
    var you = 0;
    history.forEach((element) => {
      element.whowins == "you" ? you++ : "";
      element.whowins == "computadora" ? computer++ : "";
    });
    return { countYou: you, countComputer: computer };
  },

  setMove(move, whowins) {
    this.data.history.push({ move, whowins });
    const currentState = this.getState();
    currentState.currentGame = move;
    this.setState(currentState);
  },
  whoWins(myPlay: string, computerPlay: string) {
    const youTijera = myPlay == "tijera" && computerPlay == "papel";
    const youPiedra = myPlay == "piedra" && computerPlay == "tijera";
    const youPapel = myPlay == "papel" && computerPlay == "piedra";

    const winYou = [youPapel, youPiedra, youTijera].includes(true);

    const compuTijera = myPlay == "papel" && computerPlay == "tijera";
    const compuPiedra = myPlay == "tijera" && computerPlay == "piedra";
    const compuPapel = myPlay == "piedra" && computerPlay == "papel";

    const winCompu = [compuPapel, compuPiedra, compuTijera].includes(true);

    if (winCompu) {
      return "computadora";
    } else if (winYou) {
      return "you";
    }
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved", JSON.stringify(newState.history));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };

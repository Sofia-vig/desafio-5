//Router
import { initRouter } from "./router";

//Components
import "./components/button";
import "./components/text";
import "./components/hand";
import "./components/contador";
import "./components/resultado";

(function () {
  const root = document.querySelector(".root");
  initRouter(root);
})();

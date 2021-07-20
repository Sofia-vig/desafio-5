//Pages
import { pageInicio } from "./pages/inicio";
import { pageComoJugar } from "./pages/como-jugar";
import { pageJuego } from "./pages/juego";
import { pageResultado } from "./pages/resultado";

//Routes
const routes = [
  {
    path: /\/game/,
    component: pageInicio,
  },
  {
    path: /\/inicio/,
    component: pageInicio,
  },
  {
    path: /\/como-jugar/,
    component: pageComoJugar,
  },
  {
    path: /\/jugar/,
    component: pageJuego,
  },
  {
    path: /\/resultado/,
    component: pageResultado,
  },
];

export function initRouter(container: Element) {
  function goTo(path: string) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });
        container.firstChild?.remove();
        container.appendChild(el);
      }
    }
  }

  if (location.pathname == "/") {
    goTo("/inicio");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}

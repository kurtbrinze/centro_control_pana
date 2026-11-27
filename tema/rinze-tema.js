/* Rinze Studio · ayuda del tema global.
   - Marca <html class="rz-en-centro"> cuando la app corre dentro del Centro
     de Control, para ocultar logo y versión repetidos.
   - Aplica el tema elegido (oscuro por defecto). Dentro del centro se lee
     el mismo valor del centro, si es del mismo sitio. */
(function () {
  'use strict';
  var html = document.documentElement;
  try { if (window.top !== window.self) html.classList.add('rz-en-centro'); } catch (_) { html.classList.add('rz-en-centro'); }
  var tema = 'oscuro';
  try { tema = localStorage.getItem('rz.tema') || tema; } catch (_) {}
  try { if (window.top !== window.self) tema = window.top.localStorage.getItem('rz.tema') || tema; } catch (_) {}
  html.setAttribute('data-tema', tema);
})();

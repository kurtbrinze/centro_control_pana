# Centro de Control · Panadería

Un solo lugar para abrir las apps de trabajo de la panadería. Cada app se abre
embebida dentro del centro y sigue abierta mientras se cambia de una a otra.
Funciona en laptop, tablet y celular, y se puede instalar como app. Estilo Rinze Studio.

## Apps

| App | Dónde vive |
|---|---|
| Control Producción | https://calculoproduccion.vercel.app |
| Entregas a CEDI | https://kurtbrinze.github.io/CD/ |
| Agenda | https://agenda-chi-wheat.vercel.app/ |
| Desviaciones | https://kurtbrinze.github.io/Desviaciones/ |

## Agregar una app

Edita `apps.json` y copia un bloque:

```json
{
  "id": "inventario",
  "nombre": "Inventario",
  "corto": "Inventario",
  "descripcion": "Existencias de insumos.",
  "url": "https://...",
  "icono": "inventario",
  "dispositivos": ["Laptop"],
  "hosting": "Vercel",
  "modo": "embebida"
}
```

- `corto`: nombre breve para la barra del celular.
- `icono`: produccion, entregas, desviaciones, agenda, inventario, documento, camara, grafica o caja.
- `modo`: `embebida` (dentro del centro) o `pestana` (se abre aparte, para apps que no funcionan dentro de un marco).

Al guardar en GitHub, Vercel publica el cambio solo.

## Sincronización de las apps embebidas

Dentro del centro, el navegador guarda los datos de cada app aparte de la app
abierta sola. Por eso, la primera vez en cada equipo, Producción y Agenda
muestran un aviso para poner la clave de sincronización. Después de eso, cada
vez que el centro vuelve a mostrar una app le manda el mensaje
`{ tipo: 'cc:mostrar' }`, y la app trae lo último de Vercel Blob.

## Versión

La versión visible está en `index.html` (`VERSION`). Cada actualización la sube.

- **V.5** — Ícono de la app instalada: rodaja de pan naranja sobre fondo oscuro. El logo de Rinze Studio sigue dentro del centro.
- **V.4** — Logo oficial de Rinze Studio. Barra lateral compacta: cada app es un ícono con su nombre en letra pequeña. Orden: Producción, Entregas, Agenda, Desviaciones.
- **V.3** — Instalable como app (PWA): ícono, pantalla completa, accesos directos a cada app y funciona sin conexión para abrir el centro.
- **V.2** — Avisa a la app que se vuelve a mostrar para que traiga lo último de su nube.
- **V.1** — Centro con barra lateral, íconos en tablet y navegación inferior en celular; registro en `apps.json`.

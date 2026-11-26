# Centro de Control · Panadería

Un solo lugar para abrir las apps de trabajo de la panadería. Cada app se abre
embebida dentro del centro y sigue abierta mientras se cambia de una a otra.
Funciona en laptop, tablet y celular, y se puede instalar como app. Estilo Rinze Studio.

## Apps

| App | Dónde vive |
|---|---|
| Control Producción | https://calculoproduccion.vercel.app (en el centro: `/apps/produccion/`) |
| Entregas a CEDI | https://kurtbrinze.github.io/CD/ (en el centro: `/apps/cd/`) |
| Agenda | https://agenda-chi-wheat.vercel.app/ |
| Desviaciones | https://kurtbrinze.github.io/Desviaciones/ (en el centro: `/apps/desviaciones/`) |
| Resumen Rutas Supermercados | https://rutaspana.vercel.app (en el centro: `/apps/rutas/`) |

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
- `icono`: produccion, entregas, desviaciones, agenda, rutas, inventario, documento, camara, grafica o caja.
- `modo`: `embebida` (dentro del centro) o `pestana` (se abre aparte, para apps que no funcionan dentro de un marco).

Al guardar en GitHub, Vercel publica el cambio solo.

## Apps que eligen carpetas

Chrome no deja que una app embebida desde otro sitio abra el selector de
carpetas (`showDirectoryPicker`). Por eso Control Producción, Entregas a CEDI,
Desviaciones y Resumen Rutas se sirven desde el mismo sitio del centro: `vercel.json` reenvía
`/apps/produccion/` a Vercel y `/apps/cd/` y `/apps/desviaciones/` a GitHub
Pages. Siguen publicándose como siempre; el centro sólo las muestra desde su
propia dirección.

Para estas apps, los vínculos a carpetas y archivos se guardan en el
navegador por sitio: los que hagas dentro del centro son distintos de los de
la app abierta en github.io. Si Entregas usa Gmail, en Google Cloud hay que
agregar `https://centrocontrolpana.vercel.app` como origen autorizado.

## Sincronización de las apps embebidas

Dentro del centro, el navegador guarda los datos de cada app aparte de la app
abierta sola. Por eso, la primera vez en cada equipo, Producción y Agenda
muestran un aviso para poner la clave de sincronización. Después de eso, cada
vez que el centro vuelve a mostrar una app le manda el mensaje
`{ tipo: 'cc:mostrar' }`, y la app trae lo último de Vercel Blob.

## Tarjetas del inicio (resumen del día)

Cada tarjeta muestra el resumen que deja su app, con la hora en que se
actualizó. Las apps lo dejan como `{ v, app, actualizado, datos }`:

| App | Cómo llega | Qué trae |
|---|---|---|
| Control Producción | `localStorage` `cc.insight.produccion` | QQ del día por planta y por turno, con claves |
| Entregas a CEDI | `localStorage` `cc.insight.entregas` | Próximas entregas: proveedor, OC, cita y estado |
| Agenda | `postMessage` (`cc:insight`), se guarda en `cc.insight.agenda` | Hoy y el próximo día: rutas, empaques, personal, ausencias, reuniones y notas |
| Desviaciones | `localStorage` `cc.insight.desviaciones` | Fill Rate vs objetivo, alertas (top 3), OC manuales, venta vs FCST y próximo evento |

Las tres primeras se sirven desde el sitio del centro, así que escriben
directo; la Agenda vive en otro sitio y manda su resumen sólo a la dirección
del centro. Con `"precargar": true` en `apps.json` la app se abre escondida al
arrancar, para que su tarjeta tenga datos frescos (hoy: Agenda).

## Calendario

Botón **Calendario** abajo a la izquierda (o Alt+C; en el celular, el ícono de
la barra superior). Abre una ventana encima de cualquier app que se mueve
arrastrando su barra y recuerda dónde quedó. Muestra el año con dos vistas:

- **Semana normal**: ISO 8601, de lunes a domingo.
- **Semana Walmart**: de sábado a viernes; el año fiscal arranca el sábado más
  cercano al 1 de febrero y la semana se escribe año + número (202643), igual
  que en la Agenda.

Al tocar un día, abajo aparecen las dos semanas con sus fechas. En el inicio,
una línea muestra las semanas de hoy.

## Versión

La versión visible está en `index.html` (`VERSION`). Cada actualización la sube.

- **V.12** — Arreglo: la capa de las apps embebidas tapaba el inicio y los clics en las tarjetas no llegaban.
- **V.11** — Tarjetas con el resumen del día de cada app (Producción por turno, próximas entregas, Agenda, Desviaciones); ícono y título abren la app; «Agregar aplicación» como botón abajo a la derecha y la nota al pie a la izquierda.
- **V.10** — El centro siempre abre en Inicio (Chrome podía reabrirlo en la última app usada). Los accesos directos del ícono usan ?app=. La luz de Calendario e Instalar ya no se enciende en Inicio.
- **V.9** — Control Producción también se sirve desde el sitio del centro, para elegir la carpeta de archivos.
- **V.8** — La luz verde del menú se enciende sólo en la app que está en pantalla.
- **V.7** — Calendario flotante con semanas normales y Walmart; línea «Hoy» en el inicio; logo completo de Rinze Studio arriba a la izquierda (se quita el del pie del inicio).
- **V.6** — Entregas a CEDI y Desviaciones se sirven desde el mismo sitio del centro para que puedan elegir carpetas.
- **V.5** — Ícono de la app instalada: rodaja de pan naranja sobre fondo oscuro. El logo de Rinze Studio sigue dentro del centro.
- **V.4** — Logo oficial de Rinze Studio. Barra lateral compacta: cada app es un ícono con su nombre en letra pequeña. Orden: Producción, Entregas, Agenda, Desviaciones.
- **V.3** — Instalable como app (PWA): ícono, pantalla completa, accesos directos a cada app y funciona sin conexión para abrir el centro.
- **V.2** — Avisa a la app que se vuelve a mostrar para que traiga lo último de su nube.
- **V.1** — Centro con barra lateral, íconos en tablet y navegación inferior en celular; registro en `apps.json`.

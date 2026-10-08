# Presentación de plugins

Revisión: **7 de octubre de 2026**. Proyecto local: `CompanyManager`, commit `b017de0deef6ffe3284625776a8753f444913117`, con el árbol limpio.

## Para qué es esta carpeta

Es un instructivo con dos lectores: quien quiere entender cómo funcionan los plugins en una sede, y quien quiere armar y publicar uno propio. Por eso todo lo técnico (campos del manifest, límites, código prohibido, mensajes de error, formato de `extract()`) está copiado del código, y lo que la app todavía no hace está marcado como **"En el plan"** o **"En prueba"**, no presentado como si anduviera.

## Qué se hizo en esta revisión

- **Se reescribieron las nueve presentaciones**, leyendo antes la tienda de plugins (`portals/plugins-store`), el router y el cargador de `system/marketplace`, la política de código y el runner aislado. Las anteriores describían un marketplace que no existe: cuatro modelos de precio, reparto de ingresos y una calculadora de ganancias, entre otras cosas.
- **Se borró `armonia.html`** ("Libertad y Armonía"): hablaba de promociones automáticas por plugin, que no existen.
- **El mapa quedó en tres columnas**: para usarlos, armar uno propio y publicarlo. Se le sacó el script que redirigía a `localhost:5173/ecosystem`.
- **La base visual se separó en `presentacion.css` y `presentacion.js`**, la misma que `tienda/`, con unas pocas clases propias al final (bloques de código, etiquetas "En el plan", la tienda).
- **La tarjeta de `mainindex.html`** dejó de prometer "monetización para developers".

## Lo que la presentación dice que no existe

- **Cobro de plugins.** `price`, `currency` e `is_subscription` se guardan y el precio se muestra, pero `/acquire` suma el plugin a la biblioteca sin cobrar. No hay saldo, reparto ni retiros. `monetizacion.html` lo dice así y no da porcentajes.
- **Eventos y hooks.** Un plugin de comunidad hoy solo corre como importador de catálogo ("Importar con motor"). Los de precios corren solo con las variables de entorno de prueba.
- **Actualizaciones por envío.** Un slug publicado no acepta un envío nuevo: la versión nueva la instala un administrador ("Forge Interno" → "Instalar y publicar") y reemplaza el código para todos.

## Hallazgos del código

- **El motivo del rechazo ya llega a la pantalla** (`b017de0d`). Antes `/submit-zip` respondía siempre "No se pudo validar el ZIP del plugin."; ahora devuelve el mensaje del cargador o de la política, y `manifest.html` lo cuenta así. El genérico queda para fallas del servidor.
- **El ícono `fa-sparkles` de la etiqueta "Nuevo" en `MarketCard.vue`** es de Font Awesome Pro y sale vacío.

## Cómo se verificó

Igual que `tienda/` (ver su `ACTUALIZACION.md`): cada diapositiva entra en 780 px a 1440 × 860, también con las demos en su estado más alto (la cola con la última devolución, la ficha con la calificación guardada); sin desborde a 375 px; íconos de Font Awesome 6.5.1 libre; demos recorridas por código sin errores; todos los `href` relativos existen.

## Mantener al día

`revision-proyecto.json` registra las fuentes que se leyeron por presentación y la huella SHA-256 de cada una:

```powershell
python verificar-vigencia.py --proyecto C:\Proyectos\CompanyManager
```

Son **30 fuentes**. Las que más probablemente cambien el contenido: `infrastructure/loader.py` (campos y mensajes del manifest), `infrastructure/policy.py` (código prohibido), `api/router.py` (envío, revisión, acceso) y `domain/rules.py` (quién ve qué). Si aparece el cobro, `monetizacion.html` es la primera a reescribir, y después las etiquetas "En el plan" del resto.

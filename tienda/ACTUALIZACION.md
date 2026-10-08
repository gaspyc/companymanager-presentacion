# Presentación de la tienda

Revisión: **7 de octubre de 2026**. Proyecto local: `CompanyManager`, commit `c0ea43803c5749c08c325cf7cf603d17a94b31e8`, con el árbol limpio.

## Qué se hizo en esta revisión

- **Se reescribieron las 13 presentaciones que había**, leyendo antes la vista Vue y, donde decide algo, el backend. Las anteriores eran de junio y julio: no conocían la transferencia con centavos, los correos, la seña, el enlace propio, las reseñas ni la vitrina, y todavía hablaban de "precio mayorista" donde hoy dice "Escala de N".
- **Se sumaron tres**: `direcciones.html` (las puertas de una tienda y su dirección oficial), `pagos.html` (el checkout no entraba en una sola) y `vitrina.html` (la pantalla del local).
- **`comocomprar.html` estaba vacío** y ahora tiene su presentación. "Selector de diseño" no tiene una propia: es la tercera diapositiva de `storefront.html`.
- **El mapa quedó en 16 apartados** en tres columnas: vidriera, experiencia de compra, y cuenta y postventa. Se le sacó el script que redirigía a `localhost:5173/ecosystem`, que en `marca/` y `sede/` ya no está.
- **Los nombres de archivo de los enlaces coinciden con los archivos.** Las presentaciones viejas enlazaban a `StoreCatalog.html`, `CheckoutModal.html`, etc., de antes de renombrarlas.
- **La base visual se separó en `presentacion.css` y `presentacion.js`.** Es la misma lengua que marca y sede; cada página lleva solo sus maquetas. Las maquetas de la tienda van en claro porque la tienda clásica es clara.

## Cómo se verificó cada presentación

1. **Altura**: a 1440 × 860, cada diapositiva entra en 780 px, medido sobre el `scrollHeight` de `.slide-content-wide`. Las demos se midieron también **en su estado más alto**: el correo con retiro en sucursal, todos los botones de pago, el calendario de turnos con el resumen completo, el armador con los pliegues abiertos y la verificación del arrepentimiento.
2. **Ancho**: sin desborde a 1440 px ni a 375 px, medido por elemento. Los halos decorativos (`.glow-*`) se salen del documento igual que en marca y sede, y el `overflow: hidden` los recorta.
3. **Íconos**: cada clase de Font Awesome resuelve a un glifo de la 6.5.1 libre.
4. **Demos**: cada una se recorrió por código, con clics y cambios, sin errores de JavaScript.
5. **Enlaces**: todos los `href` relativos llevan a un archivo que existe.
6. **Textos**: los de las maquetas son los del componente, con sus tildes o la falta de ellas ("Iniciar sesion", "Calificar", "Minimo 6"). Los números de los ejemplos se recalcularon con la regla del código: escalas, porcentaje del combo, seña, centavos de la transferencia, precio sin impuestos y precio por kilo.

## Agregado después de la revisión

- **`agenda.html` suma la diapositiva de los pases y su QR** (ahora son cinco). Se revisó contra el commit `a9541230` de `main`, donde "Activos" empezó a cargar los pases (`/users/me/passes`): antes la solapa decía "Sin suscripciones" a quien había comprado uno. El QR de la maqueta es uno real, generado con las opciones de `utils/qr.js` y el color del modal. La diapositiva dice que **nadie lo escanea**: ninguna pantalla del local lee `customer_pass`. Las huellas de sus cuatro fuentes son las de ese commit.

## Lo que se dejó afuera a propósito

Tres cosas que el código tiene pero no hacen lo que parece. No se presentan como si anduvieran:

- **Las "Sugerencias" y el filtro de días de "Mis servicios" no se presentan todavía.** Desde `a9541230` son reales —clases con lugar de los negocios donde el cliente ya es cliente, y restricciones guardadas en la cuenta—, pero la presentación no las muestra aún.
- **Una sede bajo el dominio de su marca se ve con la Tienda Clásica.** `docs/marca-y-sedes-en-un-dominio.md` dice "con su diseño", pero `shouldUseAssignedStorefrontDesign` no contempla las rutas `BrandBranchDomainStoreFront` ni `BrandBranchStoreFront`. La presentación no afirma ninguna de las dos cosas.
- **Los productos digitales no salen en el catálogo clásico.** `digital` está en `CATALOG_EXCLUDED_TYPES`, así que la insignia "Entrega Inmediata", el botón "Descargar" y el checkout de solo digitales no se alcanzan desde ahí.

## Alcance

Esta carpeta es una presentación HTML, no una copia ejecutable de la aplicación. Los ejemplos usan datos ficticios. Las demos reproducen la regla del código en el navegador, no llaman a ninguna API, no cobran y no crean pedidos.

Lo que la sede configura de su tienda (diseño, medios de pago, envíos, textos) está en `sede/Tienda.html`. Esta carpeta es lo que ve el cliente.

## Mantener al día

`revision-proyecto.json` registra, por presentación, las fuentes que se leyeron y la huella SHA-256 de cada una. Para detectar cambios sin modificar archivos:

```powershell
python verificar-vigencia.py --proyecto C:\Proyectos\CompanyManager
```

Son **72 fuentes**, y el script nombra qué presentación revisar por cada una que cambió. Que una fuente cambie indica que hay que mirar ese contenido, no que toda la presentación esté desactualizada. Las rutas públicas nuevas (`app/router/index.js`) también hay que compararlas con el mapa: una pantalla que no está en `index.html` no la va a señalar ningún hash.

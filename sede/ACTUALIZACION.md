# Presentación de la sede

Revisión: **15 de septiembre de 2026**. Proyecto local: `CompanyManager`, commit `076db513af19eae529749687014e2febd4e0ce07`.

El árbol tenía trabajo sin commitear el día de la revisión —un refactor de estilos compartidos que toca cuarenta archivos— y las huellas del manifiesto salen del **árbol de trabajo**, no del commit. Se revisó que ese refactor fuera cosmético (mueve reglas CSS repetidas a una hoja común) y no cambiara ninguna de las afirmaciones de las presentaciones.

## Qué se hizo en esta revisión

- **Se alinearon las 25 presentaciones con el código**, una por una, leyendo la vista Vue y el módulo de backend que le corresponde antes de escribir.
- **Se eliminó el resumen de cierre** que estaba pegado al final de 17 presentaciones. No describía lo que cada módulo hace hoy y estaba escrito en otro lenguaje visual (`actualizacion.css`, `sync-content`, `sync-grid`, `demo-window`), así que desentonaba con el resto de su propia presentación. Ninguna presentación conserva ya una diapositiva `sync-slide`.
- **Ocho presentaciones se escribieron de cero** sobre el motor de diapositivas del resto —no sobre la maqueta genérica—: Campañas, Servicios, Presupuestos, Impuestos, Actividad, Contestadora, Alquileres y Fabricación.
- **Las otras diecisiete se corrigieron por dentro**: se rehicieron las maquetas que habían quedado viejas (el ticket del POS, el panel de envíos, el editor de pedidos, los KPI del inicio), se sacó la copia que el código no respalda y se sumaron diapositivas donde faltaba materia.
- **El mapa quedó en 25 apartados**, con descripciones fieles y sin ninguno marcado «En preparación».

## Cómo se verificó cada presentación

Para todas, en este orden:

1. **Altura**: a 1440 × 860 el contenido de cada diapositiva entra en el presupuesto de 780 px, medido sobre el `scrollHeight` real de `.slide-content-wide`, no a ojo.
2. **Ancho**: sin desborde ni recorte horizontal, ni a 1440 px ni a 375 px.
3. **Orden en el teléfono**: el título va primero y las notas al final. Lo que cuelga de la diapositiva sin `order` propio se subía arriba del título; se corrigió en las 25.
4. **Íconos**: se comprueba que cada clase de Font Awesome resuelva a un glifo en la versión 6.5.1 libre, porque un ícono inexistente no falla, se dibuja vacío.
5. **Enlaces**: los nombres de archivo coinciden en mayúsculas y minúsculas, que en un servidor sensible a mayúsculas es la diferencia entre navegar y un 404.
6. **Aritmética**: donde una diapositiva afirma que los números cierran, se recalcularon con `Decimal` siguiendo la fórmula del backend. Eso cambió cifras en Presupuestos, Impuestos, Alquileres y Fabricación.

## Alcance

Esta carpeta es una presentación HTML, no una copia ejecutable de la aplicación Vue. Los ejemplos visuales contienen datos ficticios y no reproducen píxel por píxel la interfaz actual. No conectan con APIs, no cobran ni emiten comprobantes. Las prestaciones descritas se revisaron contra el código local; la disponibilidad en una instalación depende de permisos, configuración e integraciones.

Fabricación es un módulo que la sede puede sumar: desde que el menú es un catálogo único, el tipo de nodo elige con qué arranca la barra y no qué módulos existen. Actividad y Presupuestos son pantallas a las que se llega desde otros accesos; el mapa presenta capacidades, no copia el orden de la barra lateral. Facturación corresponde al historial de ventas (`sales-history`). Contestadora vive dentro del espacio de Campañas, en su sección de mensajes. Pantallas móviles, cola y reposición se describen dentro de sus módulos.

## Mantener al día

`revision-proyecto.json` registra, por presentación, las fuentes que se leyeron para escribirla y la huella SHA-256 de cada una. Para detectar cambios sin modificar archivos:

```powershell
python verificar-vigencia.py --proyecto C:\Proyectos\CompanyManager
```

Son **93 fuentes** y el script nombra qué presentación revisar por cada una que cambió. Un cambio de fuente indica que hay que mirar ese contenido, no que toda la presentación esté desactualizada. Las rutas nuevas del proyecto también deben compararse con el mapa: una pantalla que no está en `index.html` no la va a señalar ningún hash.

Los scripts antiguos `patch_missing.js`, `precision_fix.js`, `precision_fix_safe.js` y `add_f_shortcut.js` son parches históricos: no forman parte de la ejecución de las páginas y no deben reaplicarse sobre esta revisión.

## Correspondencia con el código

Rutas relativas a la raíz de CompanyManager. Se nombra la fuente principal; el manifiesto lista las demás fuentes de cada presentación.

| Presentación | Fuente principal |
| --- | --- |
| [Inicio de la sede](BranchDashboard.html) | `frontend/src/modules/workspaces/branch/views/Home.vue` |
| [Punto de Venta](POS.html) | `frontend/src/modules/workspaces/branch/views/POS.vue` |
| [Ajustar Catálogo](Catalogo.html) | `frontend/src/modules/features/catalog/views/Staging.vue` |
| [Tienda en Línea](Tienda.html) | `frontend/src/modules/workspaces/branch/views/Storefront.vue` |
| [Clientes](Clientes.html) | `frontend/src/modules/workspaces/branch/views/Customers.vue` |
| [Turnos](Agenda.html) | `frontend/src/modules/workspaces/branch/views/Bookings.vue` |
| [Servicios](Servicios.html) | `frontend/src/modules/workspaces/branch/views/Services.vue` |
| [Promos y Combos](Promociones.html) | `frontend/src/modules/workspaces/branch/views/Promotions.vue` |
| [Inventario](Inventario.html) | `frontend/src/modules/workspaces/branch/views/InventoryRouter.vue` |
| [Fabricación](Fabricacion.html) | `frontend/src/modules/workspaces/factory/views/Production.vue` |
| [Alquileres](Alquileres.html) | `frontend/src/modules/workspaces/branch/views/Rentals.vue` |
| [Pedidos](Operaciones.html) | `frontend/src/modules/workspaces/branch/views/Operations.vue` |
| [Despachos](rondas.html) | `frontend/src/modules/workspaces/branch/views/Logistics.vue` |
| [Proveedores](Proveedores.html) | `frontend/src/modules/workspaces/branch/views/Suppliers.vue` |
| [Presupuestos](Presupuestos.html) | `frontend/src/modules/workspaces/branch/views/SalesQuotes.vue` |
| [Facturación](Facturacion.html) | `frontend/src/modules/workspaces/branch/views/SalesHistory.vue` |
| [Finanzas](Caja.html) | `frontend/src/modules/workspaces/branch/views/FinanceDashboard.vue` |
| [Auditoría de rentabilidad](Auditoria.html) | `frontend/src/modules/workspaces/branch/views/Auditor.vue` |
| [Gastos e Inversiones](Inversiones.html) | `frontend/src/modules/workspaces/branch/views/Investments.vue` |
| [Impuestos](Impuestos.html) | `frontend/src/modules/workspaces/branch/views/TaxBooks.vue` |
| [Actividad](Actividad.html) | `frontend/src/modules/workspaces/branch/views/Activity.vue` |
| [Campañas](Campanas.html) | `frontend/src/modules/workspaces/brand/views/Campaigns.vue` |
| [Contestadora](Contestadora.html) | `frontend/src/modules/workspaces/brand/components/campaigns/AutoResponderPanel.vue` |
| [Equipo y Roles](Encargados.html) | `frontend/src/modules/workspaces/branch/views/Staff.vue` |
| [Ajustes](Ajustes.html) | `frontend/src/modules/workspaces/branch/views/Settings.vue` |

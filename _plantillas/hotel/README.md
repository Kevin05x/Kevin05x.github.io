# Molde de hotel (Kevin Huamán)

Web de hotel completa con 2 vistas: reserva con total estimado, comparador, detalle de habitaciones, servicios, galería, carta con pedido a la habitación por WhatsApp, paquetes, reseñas, ubicación, formulario de consulta, preguntas y políticas.

## Cómo hacer la demo de otro hotel
1. Copiar `clientes/hotel_americano.py` a `clientes/hotel_<nombre>.py` y cambiar los datos (nombre, dirección, WhatsApp, habitaciones, servicios, carta, paquetes, FAQ, políticas).
2. Colores: en `"tema"` del config, por vista, sobrescribir las variables CSS (`--acc`, `--acc2`, `--dark`, `--bg`, `--surf`, `--soft`, etc.). Si no se pone nada, usa los de la plantilla.
3. Logo: `"logo"` = data URI del logo. Foto principal: `"fotoHero"` = data URI. Fotos de galería: `"src"` en cada elemento de `"galeria"`.
4. Generar: `python3 build.py clientes/hotel_<nombre>.py ../../demos/<carpeta>/index.html`
5. Regla de datos (AGENTS.md): lo que el hotel no publicó va como "ejemplo" (`"pub": False`, `"real": False`).
6. Probar a 390 y 1366 px, commit y push.

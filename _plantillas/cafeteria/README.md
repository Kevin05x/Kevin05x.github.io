# Molde de cafetería / restaurante (Kevin Huamán)

Web de cafetería completa con 2 vistas. Lo propio del rubro: buscador de café (sabor, intensidad, temperatura, leche) con recomendación de la carta y rueda de sabores (Vista 2), carta digital con pedido para llevar o para el local (hora de recojo, nombre, notas) por WhatsApp, reserva de mesa, escuela del café (métodos), historia, agenda de música, galería, reseñas, ubicación, contacto, preguntas y datos útiles.

Reutiliza el CSS base de `../hotel/plantilla.html` (por eso las dos carpetas van juntas).

## Cómo hacer la demo de otra cafetería o restaurante
1. Copiar `clientes/cafe_jaenitos.py` a `clientes/<negocio>.py` y cambiar los datos: nombre, dirección, WhatsApp, carta (con etiquetas de sabor/intensidad/temperatura para que el buscador funcione), métodos, agenda, galería, FAQ.
2. Colores: `"tema"` del config, por vista (variables CSS `--acc`, `--acc2`, `--bg`, `--surf`, `--dark`, etc.). Logo: `"logo"` (data URI). Fotos: `"src"` en `"galeria"`.
3. Generar: `python3 build.py clientes/<negocio>.py ../../demos/<carpeta>/index.html`
4. Regla de datos: lo que el negocio no publicó va como ejemplo; las fotos solo del negocio.
5. Probar a 390 y 1366 px, commit y push.

Para un restaurante (no cafetería): en el config cambiar los textos del buscador ("sabores") por tipos de plato o dejar solo la carta.

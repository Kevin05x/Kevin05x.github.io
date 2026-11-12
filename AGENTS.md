# Reglas para crear demos de Kevin Huamán

Este repo es el portafolio de Kevin Huamán (desarrollador, Cajamarca, Perú). La carpeta `demos/` guarda **bocetos de propuesta**: páginas que Kevin arma para un negocio concreto que aún no tiene web, y que envía por WhatsApp para que el dueño vea *su* negocio funcionando. Tu trabajo es construir esas demos a partir de un **brief** (ver `demos/_BRIEF-PLANTILLA.md`). No contactes a nadie ni publiques nada fuera de este repo.

## 1. Dónde va
- Una carpeta por demo: `demos/<negocio>-<3 caracteres al azar>/index.html` (ejemplo: `demos/hostal-almagro-7r4/`).
- Un solo archivo `index.html`: HTML, CSS y JS juntos. No toques otras demos ni el `index.html` de la raíz.
- URL final: `https://kevin05x.github.io/demos/<carpeta>/`

## 2. Qué debe tener
- **Nada genérico.** Identidad propia del negocio: colores y tono de su logo/redes, tipografía elegida a propósito y una **función propia del rubro** (calculadora, calendario de fechas, reserva con total estimado, catálogo con pedido por WhatsApp, etc.). Referencias de calidad: `demos/hostal-almagro-7r4`, `demos/ro-motors-2p8`, `demos/kjachos-3x7`.
- Si hay foto real del negocio, úsala en el hero (a pantalla completa con desvanecido de color de marca funciona bien).
- Botón y enlaces de WhatsApp con `https://wa.me/<número del negocio>?text=<mensaje armado>`. El número lo da el brief. La página nunca recoge ni envía datos a un servidor.

## 3. Datos: reales o marcados como ejemplo
- **Reales solo si están verificados** en el brief (nombre, dirección, teléfonos, horarios, reseñas de Google Maps, servicios que el propio negocio publica). **Nunca inventes** direcciones, reseñas, premios, años de experiencia ni clientes.
- Todo **precio, tarifa, horario o promo que el negocio no haya publicado** va como **"de ejemplo"**, visible en la página.
- Fotos: solo las del propio negocio (su Instagram, TikTok, ficha de Maps), rotuladas "foto referencial". Nunca fotos de terceros ni de stock presentadas como del negocio.
- Reseñas: solo reales, atribuidas ("Huésped · Google Maps"). No pongas estrellas individuales si no las conoces.
- Los precios de Kevin (web desde S/ 600, etc.) **no aparecen** en la demo: la demo es del negocio, no de Kevin.

## 4. Banner y SEO
- Primera línea de la página: `Boceto de propuesta preparado por Kevin Huamán para <Negocio> · <qué es de ejemplo>`.
- `<meta name="robots" content="noindex,nofollow,noarchive">`, `<html lang="es">` y `<title>Boceto <Negocio> <Ciudad></title>`.

## 5. Técnica
- Imágenes como `data:` URI, optimizadas (cada una ≲ 100 KB). Fuentes solo de Google Fonts, con respaldo. Sin librerías externas salvo que sean necesarias (cdnjs, versión fija). Sin iframes externos.
- Tema claro u oscuro según la marca. Define colores como variables CSS y da fondo explícito al `body`.
- Textos en español peruano, trato de "usted".

## 6. Calidad (verifica antes de entregar)
- Se ve bien en **1366 px** y en **390 px**, sin scroll horizontal (`document.documentElement.scrollWidth === innerWidth`).
- Sin errores en consola. Foco visible en botones y campos. Respeta `prefers-reduced-motion`.
- Prueba con Playwright o el navegador: captura de escritorio y de celular, y prueba los formularios y botones.

## 7. Entrega
```
git add demos/<carpeta>
git commit -m "Demo <Negocio>: <qué hace en una frase>"
git push origin main
```
Luego confirma que `https://kevin05x.github.io/demos/<carpeta>/` responde 200 (GitHub Pages tarda 1 a 2 minutos) y devuelve a Kevin ese enlace.

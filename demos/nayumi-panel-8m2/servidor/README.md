# API del panel NAYUMI

Servidor publicado en la cuenta de Cloudflare de Kevin: https://nayumi-panel-api.tiendix-fotos-worker.workers.dev. Base de datos D1: nayumi-panel-datos; enlace DB. La configuración de despliegue está en wrangler.jsonc y se mantiene el plan gratuito; no se necesita R2 para guardar los registros del panel.

La base está creada y contiene las tablas de esquema.sql. No volver a ejecutar ese esquema sobre la base publicada. Las contraseñas vigentes de Kevin y Nayumi se conservaron; sus hashes y la firma de sesiones están configurados como secretos del Worker, sin valores en este repositorio.

La interfaz está en ../index.html y se publica desde este repositorio mediante GitHub Pages. El servidor valida los usuarios, guarda los registros compartidos y controla las actualizaciones simultáneas. GitHub Pages publica archivos estáticos y no ejecuta este servidor.

Este directorio contiene la API equivalente como Worker ESM independiente, para que su código también esté en el repositorio de Kevin. Requiere una base Cloudflare D1 con el enlace DB y las tablas de esquema.sql. Los secretos de ejecución son NAYUMI_PASSWORD_HASH, KEVIN_PASSWORD_HASH y NAYUMI_SESSION_SECRET. Sus valores nunca se guardan aquí. El formato de hash es PBKDF2 SHA-256, 100000 iteraciones, sal y resultado en base64url.

La interfaz inicia sesión por HTTPS y conserva únicamente una sesión temporal en sessionStorage; no guarda contraseñas. La API permite solicitudes del origen exacto https://kevin05x.github.io. No usa cookies de terceros. Cada operación comprueba la sesión en el servidor. La información registrada se almacena en la base compartida, nunca como archivos públicos del repositorio.

La misma base y las claves actuales deben conservarse al cambiar el alojamiento de la API. No ejecutar el esquema sobre una base que ya tenga estas tablas. No incluir respaldos reales, claves, sesiones ni archivos de entorno en este repositorio.
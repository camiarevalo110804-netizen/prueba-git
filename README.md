# prueba-git

Proyecto de prueba para servir `index.html` con recarga en caliente (live-reload).

Cómo usar (PowerShell en Windows):

1. Instala Node.js si no lo tienes: https://nodejs.org/
2. En la carpeta del proyecto ejecuta:

```powershell
npm install
```

Para usar live-server (simple):

```powershell
npm run start
```

Para usar Vite (recomendado para HMR y desarrollo moderno):

1. Instala dependencias (si no lo hiciste ya):

```powershell
npm install
```

2. Ejecuta el servidor de desarrollo (HMR):

```powershell
npm run dev
# o
npm run start  # si prefieres live-server
```

3. Abre la URL que muestre Vite (por defecto suele ser http://127.0.0.1:5173).

Alternativa (sin Node): instala la extensión "Live Server" en Visual Studio Code y haz clic en "Go Live" en la esquina inferior derecha.

Notas:
- El puerto por defecto configurado para live-server aquí es 3000. Cámbialo en `package.json` si está en uso.
- Si prefieres instalar `live-server` globalmente: `npm i -g live-server` y luego `live-server --port=3000`.
# prueba-git

Proyecto de prueba para servir `index.html` con recarga en caliente (live-reload).

Cómo usar (PowerShell en Windows):

1. Instala Node.js si no lo tienes: https://nodejs.org/
2. En la carpeta del proyecto ejecuta:

```powershell
npm install
npm run start
```

Esto ejecuta `live-server` (vía npx) en http://127.0.0.1:3000 y recargará la página cuando guardes `index.html`.

Alternativa (sin Node): instala la extensión "Live Server" en Visual Studio Code y haz clic en "Go Live" en la esquina inferior derecha.

Notas:
- El puerto por defecto configurado aquí es 3000. Cámbialo en `package.json` si está en uso.
- Si prefieres instalar `live-server` globalmente: `npm i -g live-server` y luego `live-server --port=3000`.

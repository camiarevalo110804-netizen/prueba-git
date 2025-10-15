console.log('Vite HMR listo — editando src/main.js recargará el módulo');

const app = document.createElement('div');
app.id = 'app-root';
app.innerHTML = `<p>Aplicación con Vite — edición en caliente (HMR) activa.</p>`;
document.body.appendChild(app);

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('Módulo actualizado');
  });
}

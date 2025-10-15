console.log('Vite HMR listo — editando src/main.js recargará el módulo');

const app = document.createElement('div');
app.id = 'app-root';
app.innerHTML = `<p>Aplicación con Vite — edición en caliente (HMR) activa.</p>`;
document.body.appendChild(app);

// Espera a que el DOM tenga el botón (index.html lo añade)
function setupButton() {
  const btn = document.getElementById('action-btn');
  const output = document.getElementById('output');
  if (!btn || !output) return;

  // Al pulsar el botón mostramos un SVG y animamos su trazo (efecto "dibujo")
  btn.addEventListener('click', () => {
    output.innerHTML = '';
    const shape = (document.getElementById('shape-select') || {}).value || 'wave';
    const duration = Number((document.getElementById('speed-range') || {}).value) || 1400;
    const { svg, path } = createDrawingSVG(shape);
    output.appendChild(svg);
    animatePathDraw(path, duration, { repeat: !!document.getElementById('repeat-chk')?.checked });
  });
}

// Crea un SVG con una ruta elegante para animar el trazo
function createDrawingSVG(shape = 'wave') {
  const svgns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('viewBox', '0 0 300 120');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '120');

  // Ruta tipo onda / trazo fluido
  const path = document.createElementNS(svgns, 'path');
  const d = getPathDForShape(shape);
  path.setAttribute('d', d);
  path.setAttribute('stroke', '#ff3b30');
  path.setAttribute('stroke-width', '6');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  // Añadimos un trazo de fondo claro (opcional) para que el dibujo destaque
  const bg = document.createElementNS(svgns, 'path');
  bg.setAttribute('d', path.getAttribute('d'));
  bg.setAttribute('stroke', '#ffdcdc');
  bg.setAttribute('stroke-width', '6');
  bg.setAttribute('fill', 'none');
  bg.setAttribute('stroke-linecap', 'round');
  bg.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(bg);
  svg.appendChild(path);
  return { svg, path };
}

function getPathDForShape(shape) {
  switch (shape) {
    case 'heart':
      // Corazón simple usando cubic beziers
      return 'M150 90 C 130 70, 90 60, 90 40 C 90 20, 110 10, 150 30 C 190 10, 210 20, 210 40 C 210 60, 170 70, 150 90 Z';
    case 'star':
      // Estrella (trazado continuo)
      return 'M150 20 L179 96 L256 96 L196 140 L222 216 L150 170 L78 216 L104 140 L44 96 L121 96 Z';
    case 'wave':
    default:
      return 'M10 70 C 60 10, 240 10, 290 70';
  }
}

// Anima el trazo de un path SVG usando stroke-dashoffset
function animatePathDraw(path, duration = 1000, options = { repeat: false }) {
  // Aseguramos que el elemento esté en el DOM
  const length = path.getTotalLength();
  path.style.transition = 'none';
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  let start = null;
  let rafId;
  function step(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const t = Math.min(1, elapsed / duration);
    // easing (easeOutCubic)
    const eased = 1 - Math.pow(1 - t, 3);
    path.style.strokeDashoffset = String(Math.max(0, Math.floor(length * (1 - eased))));
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      // Al terminar, opcionalmente animamos un relleno o indicamos finalizado
      path.style.strokeDashoffset = '0';
      if (options.repeat) {
        // reiniciar después de un pequeño retardo
        setTimeout(() => {
          path.style.strokeDashoffset = length;
          start = null;
          rafId = requestAnimationFrame(step);
        }, 300);
      }
    }
  }
  requestAnimationFrame(step);
  // Retornar ID por si queremos cancelarlo (por el botón reiniciar)
  return () => cancelAnimationFrame(rafId);
}

// Manejo de controles: actualizar label de velocidad y reinicio
function setupControls() {
  const speed = document.getElementById('speed-range');
  const speedVal = document.getElementById('speed-value');
  const resetBtn = document.getElementById('reset-btn');
  const output = document.getElementById('output');
  let cancelFn = null;

  if (speed && speedVal) {
    speed.addEventListener('input', () => {
      speedVal.textContent = `${speed.value}ms`;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Vaciar output y cancelar animación en curso
      output.innerHTML = '';
      if (cancelFn) cancelFn();
    });
  }
}

// Inicializamos controles adicionales cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupControls);
} else {
  setupControls();
}

// Si el DOM ya está listo, configura el botón; si no, espera al evento DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupButton);
} else {
  setupButton();
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('Módulo actualizado');
  });
}

// 1. Array de productos iniciales
const productos = [
  { id: 1, nombre: "Remera Redondos", precio: 18000 },
  { id: 2, nombre: "Gorro Spinetta", precio: 12000 },
  { id: 3, nombre: "Llavero Callejeros", precio: 4500 }
];

// 2. Selección de elementos del DOM
const contenedor = document.getElementById("contenedor");
const formulario = document.getElementById("formulario");
const buscar = document.getElementById("buscar");
const feedback = document.getElementById("feedback");

// 3. Función para renderizar en pantalla
function renderizar(lista) {
  contenedor.innerHTML = ""; // Limpia la lista

  lista.forEach((p) => {
    const div = document.createElement("div");
    div.className = "item";
    // Inyecta HTML con backticks
    div.innerHTML = `
      <span>${p.nombre} -$${p.precio}</span>
      <button onclick="eliminar(${p.id})">X</button>
    `;
    contenedor.appendChild(div);
  });
}

// 4. Agregar producto (Evento SUBMIT)
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita recargar la página

  // Agrega nuevo objeto al array
  productos.push({
    id: Date.now(),
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value
  });

  renderizar(productos); // Actualiza la lista
  formulario.reset();    // Limpia los inputs
  mostrarFeedback("¡Producto agregado!");
});

// 5. Eliminar producto
function eliminar(id) {
  const index = productos.findIndex((p) => p.id === id);
  if (index !== -1) {
    productos.splice(index, 1); // Lo saca del array
    renderizar(productos);      // Actualiza la lista
    mostrarFeedback("Producto eliminado");
  }
}

// 6. Buscar producto (Evento de teclado)
buscar.addEventListener("input", () => {
  const texto = buscar.value.toLowerCase();
  // Filtra los productos según lo escrito
  const filtrados = productos.filter((p) => p.nombre.toLowerCase().includes(texto));
  renderizar(filtrados);
});

// 7. Mostrar mensaje corto
function mostrarFeedback(msg) {
  feedback.textContent = msg;
  setTimeout(() => (feedback.textContent = ""), 2000);
}

// Renderizado inicial
renderizar(productos);
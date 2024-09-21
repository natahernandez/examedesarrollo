// Función para cargar los datos del municipio seleccionado
function cargarDatosMunicipio() {
  const municipioId = document.getElementById("municipios").value;

  // URL de la API con los IDs
  const apiUrl = `https://censopoblacion.azurewebsites.net/API/indicadores/2/${municipioId}`;

  // Hacemos el request a la API
  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error en la petición: ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          // Verificar si el dato está serializado doblemente como cadena JSON
          if (typeof data === 'string') {
              data = JSON.parse(data); // Parsea nuevamente la cadena JSON
          }
          mostrarDatos(data);
      })
      .catch(error => {
          console.error("Error al obtener los datos:", error);
          mostrarError(); // Función para mostrar un mensaje de error en el DOM
      });
}

// Función para mostrar los datos en el DOM
function mostrarDatos(data) {
  const resultadosDiv = document.getElementById("resultados");

  // Limpiar el contenido anterior
  resultadosDiv.innerHTML = '';

  // Verificación de datos para evitar null o undefined
  const html = `
    <div class="data-item"><strong>Población Total:</strong> ${data.pob_total ?? 'N/A'}</div>
    <div class="data-item"><strong>Índice de Masculinidad:</strong> ${data.indice_masculinidad ?? 'N/A'}</div>
    <div class="data-item"><strong>Edad Promedio:</strong> ${data.edad_promedio ?? 'N/A'}</div>
    <div class="data-item"><strong>Índice de Dependencia:</strong> ${data.indice_dependencia ?? 'N/A'}</div>
    <div class="data-item"><strong>Años Promedio de Estudio:</strong> ${data.anios_prom_estudio ?? 'N/A'}</div>
    <div class="data-item"><strong>Alfabetismo:</strong> ${data.alfabetismo ? `${data.alfabetismo}%` : 'N/A'}</div>
    <div class="data-item"><strong>Viviendas Particulares:</strong> ${data.viviendas_part ?? 'N/A'}</div>
    <div class="data-item"><strong>Total de Hogares:</strong> ${data.total_hogares ?? 'N/A'}</div>
    <div class="data-item"><strong>Promedio de Personas por Hogar:</strong> ${data.prom_personas_hogar ?? 'N/A'}</div>
    <div class="data-item"><strong>Porcentaje de Jefas de Hogar:</strong> ${data.total_jefas_hogar ? `${data.total_jefas_hogar}%` : 'N/A'}</div>
  `;

  resultadosDiv.innerHTML = html;
}

// Función para mostrar un mensaje de error en el DOM
function mostrarError() {
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los datos. Intente nuevamente más tarde.</div>';
}

// Cargar los datos por defecto para El Progreso al inicio
document.addEventListener("DOMContentLoaded", cargarDatosMunicipio);


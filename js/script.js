const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await postProyecto();
  } catch (error) {
    alert("Error al enviar el proyecto: " + error.message);
    console.error(error);
  }
});

function getFormData() {
  return {
    nombre: document.getElementById("nombre").value,
    codigo: document.getElementById("codigo").value,
    facultad: document.getElementById("facultad").value,
    instituto: document.getElementById("instituto").value,
    linea_investigacion: document.getElementById("lineaInvestigacion").value,
    horas_semanales_contratadas: parseInt(document.getElementById("horasSemanales").value),
    fecha_inicio: document.getElementById("fechaInicioProyecto").value,
    duracion_semestres: parseInt(document.getElementById("duracionSemestres").value),
    fecha_final: document.getElementById("fechaTerminoProyecto").value,
    institutos_participantes: document.getElementById("institucionesParticipantes").value,
    entidad_financiera_n: document.getElementById("entidadFinanciadoraNacional").value,
    entidad_financiera_i: document.getElementById("entidadFinanciadoraInternacional").value,
  };
}

async function postProyecto() {
  const response = await fetch(
    "https://uasd-sistema-g-proyectos-api-production-9323.up.railway.app/api/proyectos",
    {
      method: "POST",
	  mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getFormData()),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Fallo en el envío");
  } else {
    alert("Envío exitoso!");
    form.reset();
  }
}

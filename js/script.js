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
        entidad_financiera_n: document.getElementById("entidadFinancieraNacional").value,
        entidad_financiera_i: document.getElementById("entidadFinancieraInternacional").value,
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function postProyecto() {
    const response = await fetch(
        "https://uasd-sistema-g-proyectos-api-production-9323.up.railway.app/api/proyectos",  // Asegúrate de que la URL es correcta
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
async function cargarDatos() {
    try {
        const response = await fetch('/datos.json');
        conceptos = await response.json();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

async function guardarDatos() {
    try {
        await fetch('/guardar-datos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conceptos)
        });
        console.log('Datos guardados correctamente.');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}

let conceptos = [];

async function crearConcepto(nombre, descripcion, ejemplo, urls) {
    conceptos.push({
        nombre: nombre,
        descripcion: descripcion,
        ejemplo: ejemplo,
        urls: urls
    });
    await guardarDatos();
}

function buscarConcepto(nombre) {
    return conceptos.find(concepto => concepto.nombre === nombre);
}

// Cargar datos al iniciar la aplicación
cargarDatos();

// Ejemplo de uso
crearConcepto("matematica", "ciencia", "1+1=2", ["google/Search/matematica"]);

// Prueba de búsqueda
console.log(buscarConcepto("matematica"));

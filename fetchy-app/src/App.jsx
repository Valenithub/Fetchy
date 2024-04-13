import React, { useEffect, useState } from 'react'; // Importa la biblioteca React
import { cargarDatos, guardarDatos, buscarConcepto } from '../../backend/controller.js';

function App() {
    const [conceptos, setConceptos] = useState([]);
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoEjemplo, setNuevoEjemplo] = useState('');
    const [nuevasUrls, setNuevasUrls] = useState('');
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await cargarDatos();
            setConceptos(data);
        }
        fetchData();
    }, []);

    const handleCrearConcepto = async () => {
        await guardarDatos([
            ...conceptos,
            {
                nombre: nuevoNombre,
                descripcion: nuevaDescripcion,
                ejemplo: nuevoEjemplo,
                urls: nuevasUrls.split(',')
            }
        ]);
        setConceptos(prevConceptos => [
            ...prevConceptos,
            {
                nombre: nuevoNombre,
                descripcion: nuevaDescripcion,
                ejemplo: nuevoEjemplo,
                urls: nuevasUrls.split(',')
            }
        ]);
    };

    const handleBuscarConcepto = () => {
        const resultado = buscarConcepto(busquedaNombre, conceptos);
        setResultadoBusqueda(resultado);
    };

    return (
        <div>
            <h1>Nuevo Concepto</h1>
            <input type="text" placeholder="Nombre" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
            <input type="text" placeholder="Descripción" value={nuevaDescripcion} onChange={(e) => setNuevaDescripcion(e.target.value)} />
            <input type="text" placeholder="Ejemplo" value={nuevoEjemplo} onChange={(e) => setNuevoEjemplo(e.target.value)} />
            <input type="text" placeholder="URLs (separadas por coma)" value={nuevasUrls} onChange={(e) => setNuevasUrls(e.target.value)} />
            <button onClick={handleCrearConcepto}>Crear Concepto</button>

            <h1>Buscar Concepto</h1>
            <input type="text" placeholder="Nombre" value={busquedaNombre} onChange={(e) => setBusquedaNombre(e.target.value)} />
            <button onClick={handleBuscarConcepto}>Buscar</button>

            {resultadoBusqueda && (
                <div>
                    <h2>Resultado de la búsqueda:</h2>
                    <p>Nombre: {resultadoBusqueda.nombre}</p>
                    <p>Descripción: {resultadoBusqueda.descripcion}</p>
                    <p>Ejemplo: {resultadoBusqueda.ejemplo}</p>
                    <p>URLs: {resultadoBusqueda.urls.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default App;

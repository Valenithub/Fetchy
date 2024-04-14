import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import "./styles/app.css";

function App() {
    const [busqueda, setBusqueda] = useState('');
    const [resultado, setResultado] = useState([]);
    const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);
    const [nuevoConcepto, setNuevoConcepto] = useState({
        nombre: '',
        descripcion: '',
        ejemplo: '',
        urls: [],
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = () => {
        const conceptosGuardados = JSON.parse(localStorage.getItem('conceptos')) || [];
        setResultado(conceptosGuardados);
    };

    const buscarConcepto = (termino) => {
        const conceptosGuardados = JSON.parse(localStorage.getItem('conceptos')) || [];
        const fuse = new Fuse(conceptosGuardados, {
            keys: ["nombre"], // especificamos la clave sobre la cual buscar
            includeScore: true,
            threshold: 0.3, // ajusta este valor según tus necesidades
        });
        const resultados = fuse.search(termino);
        return resultados.map(resultado => resultado.item);
    };

    const handleChange = (event) => {
        const termino = event.target.value;
        setBusqueda(termino);
        const conceptosCoincidentes = buscarConcepto(termino);
        setResultado(conceptosCoincidentes);
        setConceptoSeleccionado(null); // Restablecer el concepto seleccionado al cambiar la búsqueda
    };

    const handleConceptoSeleccionado = (concepto) => {
        setConceptoSeleccionado(concepto);
        setBusqueda('');
        setResultado([]);
    };

    const handleNuevoConceptoChange = (event) => {
        const { name, value } = event.target;
        setNuevoConcepto({
            ...nuevoConcepto,
            [name]: value,
        });
    };

    const handleAddUrl = () => {
        setNuevoConcepto({
            ...nuevoConcepto,
            urls: [...nuevoConcepto.urls, ''],
        });
    };

    const handleUrlChange = (index, value) => {
        const urls = [...nuevoConcepto.urls];
        urls[index] = value;
        setNuevoConcepto({
            ...nuevoConcepto,
            urls,
        });
    };

    const handleNuevoConceptoSubmit = (event) => {
        event.preventDefault();
        crearConcepto(nuevoConcepto.nombre, nuevoConcepto.descripcion, nuevoConcepto.ejemplo, nuevoConcepto.urls);
        cargarDatos();
        setNuevoConcepto({
            nombre: '',
            descripcion: '',
            ejemplo: '',
            urls: [],
        });
    };

    const crearConcepto = (nombre, descripcion, ejemplo, urls) => {
        const nuevoConcepto = { nombre, descripcion, ejemplo, urls };
        const conceptosGuardados = JSON.parse(localStorage.getItem('conceptos')) || [];
        conceptosGuardados.push(nuevoConcepto);
        localStorage.setItem('conceptos', JSON.stringify(conceptosGuardados));
    };

    const handleBuscar = () => {
        if (resultado.length > 0) {
            handleConceptoSeleccionado(resultado[0]);
        } else {
            window.location.href = `https://www.google.com/search?q=${busqueda}`;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleBuscar();
        }
    };

    return (
        <div className="app">
            <h1>Buscar y Crear Conceptos</h1>
            <div>
                <h2>Buscar Concepto</h2>
                <input
                    type="text"
                    value={busqueda}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Buscar..."
                />
                <button onClick={handleBuscar}>Buscar</button>
                {resultado && resultado.length > 0 && (
                    <ul>
                        {resultado.map((concepto, index) => (
                            <li key={index} className="concepto-coincidente" onClick={() => handleConceptoSeleccionado(concepto)}>
                                {concepto.nombre}
                            </li>
                        ))}
                    </ul>
                )}
                {conceptoSeleccionado && (
                    <div>
                        <h3>Concepto Seleccionado:</h3>
                        <p>Nombre: {conceptoSeleccionado.nombre}</p>
                        <p>Descripción: {conceptoSeleccionado.descripcion}</p>
                        <p>Ejemplo: {conceptoSeleccionado.ejemplo}</p>
                        <p>URLs:</p>
                        <ul>
                            {conceptoSeleccionado.urls.map((url, index) => (
                                <li key={index}>{url}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <h2>Crear Concepto</h2>
                <form onSubmit={handleNuevoConceptoSubmit}>
                    <label>
                        Nombre:
                        <input type="text" name="nombre" value={nuevoConcepto.nombre} onChange={handleNuevoConceptoChange} />
                    </label>
                    <label>
                        Descripción:
                        <textarea name="descripcion" value={nuevoConcepto.descripcion} onChange={handleNuevoConceptoChange} />
                    </label>
                    <label>
                        Ejemplo:
                        <input type="text" name="ejemplo" value={nuevoConcepto.ejemplo} onChange={handleNuevoConceptoChange} />
                    </label>
                    <label>
                        URLs:
                        {nuevoConcepto.urls.map((url, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddUrl}>Agregar URL</button>
                    </label>
                    <button type="submit">Crear Concepto.</button>
                </form>
            </div>
        </div>
    );
}

export default App;

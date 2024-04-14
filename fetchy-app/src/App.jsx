import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import "./styles/app.css";

function App() {
    const [busqueda, setBusqueda] = useState('');
    const [resultado, setResultado] = useState([]);
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
        setBusqueda(event.target.value);
        const conceptosCoincidentes = buscarConcepto(event.target.value);
        setResultado(conceptosCoincidentes);
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

    return (
        <div className="app">
            <h1>Buscar y Crear Conceptos</h1>
            <div>
                <h2>Buscar Concepto</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Buscar:
                        <input type="text" value={busqueda} onChange={handleChange} />
                    </label>
                    <button type="submit">Buscar</button>
                </form>
                {resultado && resultado.length > 0 ? (
                    <div>
                        <h3>Resultados:</h3>
                        {resultado.map((concepto, index) => (
                            <div key={index}>
                                <p>Nombre: {concepto.nombre}</p>
                                <p>Descripción: {concepto.descripcion}</p>
                                <p>Ejemplo: {concepto.ejemplo}</p>
                                <p>URLs:</p>
                                <ul>
                                    {concepto.urls.map((url, urlIndex) => (
                                        <li key={urlIndex}>{url}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : null}
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

import React, { useState, useEffect } from "react";

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const [conceptosCoincidentes, setConceptosCoincidentes] = useState([]);
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
    const conceptoEncontrado = conceptosGuardados.find(concepto => concepto.nombre.toLowerCase() === termino.toLowerCase());
    return conceptoEncontrado || { nombre: '', descripcion: '', ejemplo: '', urls: [] };
  };

  const buscarCoincidencias = (termino) => {
    const conceptosGuardados = JSON.parse(localStorage.getItem('conceptos')) || [];
    const coincidencias = conceptosGuardados.filter(concepto => {
      const nombreLowerCase = concepto.nombre.toLowerCase();
      const terminoLowerCase = termino.toLowerCase();
      return nombreLowerCase.includes(terminoLowerCase);
    });
    const coincidenciasOrdenadas = coincidencias.sort((a, b) => {
      const aIndex = a.nombre.toLowerCase().indexOf(termino.toLowerCase());
      const bIndex = b.nombre.toLowerCase().indexOf(termino.toLowerCase());
      return aIndex - bIndex;
    });
    setConceptosCoincidentes(coincidenciasOrdenadas);
  };

  const handleChange = (event) => {
    const nuevoTermino = event.target.value;
    setBusqueda(nuevoTermino);
    if (nuevoTermino.length > 0) {
      buscarCoincidencias(nuevoTermino);
    } else {
      setConceptosCoincidentes([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const conceptoEncontrado = buscarConcepto(busqueda);
    setResultado(conceptoEncontrado);
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

  const mostrarInfoJSON = (concepto) => {
    alert(JSON.stringify(concepto, null, 2));
  };

  return (
    <div>
      <h1>Buscar y Crear Conceptos</h1>
      <div>
        <h2>Buscar Concepto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Buscar:
            <input type="text" value={busqueda} onChange={handleChange} />
          </label>
          <button type="submit">Buscar</button>
        </form>
        {conceptosCoincidentes.length > 0 && (
          <div>
            <h3>Resultados:</h3>
            <ul>
              {conceptosCoincidentes.map((concepto, index) => (
                <li key={index} onClick={() => mostrarInfoJSON(concepto)}>{concepto.nombre}</li>
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
          <button type="submit">Crear Concepto</button>
        </form>
      </div>
    </div>
  );
}

export default App;

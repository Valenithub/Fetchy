import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import "./styles/app.css";

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
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

    const handleChange = (event) => {
        const nuevoTermino = event.target.value;
        setBusqueda(nuevoTermino);
        if (nuevoTermino.length > 0) {
            const conceptosCoincidentes = buscarConcepto(nuevoTermino);
            setConceptosCoincidentes(conceptosCoincidentes);
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
    const handleSubmit = (event) => {
        event.preventDefault();
        const conceptosCoincidentes = buscarConcepto(busqueda);
        if (conceptosCoincidentes.length > 0) {
            const primerConceptoCoincidente = conceptosCoincidentes[0];
            setConceptoSeleccionado(primerConceptoCoincidente);
            setBusqueda('');
            setConceptosCoincidentes([]);
        }
    };
    
    


                      </ul>
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

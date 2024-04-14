import React, { useState, useEffect } from "react";
import "./styles/app.css";
import { Input } from "./Input";

export const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState(null);
  const [nuevoConcepto, setNuevoConcepto] = useState({
    nombre: "",
    descripcion: "",
    ejemplo: "",
    urls: [],
  });

  const [mostrarAñadir,setMostrarAñadir] = useState(false)



  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const conceptosGuardados =
      JSON.parse(localStorage.getItem("conceptos")) || [];
    setResultado(conceptosGuardados);
  };

  const buscarConcepto = (termino) => {
    const conceptosGuardados =
      JSON.parse(localStorage.getItem("conceptos")) || [];
    const conceptoEncontrado = conceptosGuardados.find(
      (concepto) => concepto.nombre.toLowerCase() === termino.toLowerCase()
    );
    return (
      conceptoEncontrado || {
        nombre: "",
        descripcion: "",
        ejemplo: "",
        urls: [],
      }
    );
  };

  const crearConcepto = (nombre, descripcion, ejemplo, urls) => {
    const nuevoConcepto = { nombre, descripcion, ejemplo, urls };
    const conceptosGuardados =
      JSON.parse(localStorage.getItem("conceptos")) || [];
    conceptosGuardados.push(nuevoConcepto);
    localStorage.setItem("conceptos", JSON.stringify(conceptosGuardados));
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
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
      urls: [...nuevoConcepto.urls, ""],
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
    crearConcepto(
      nuevoConcepto.nombre,
      nuevoConcepto.descripcion,
      nuevoConcepto.ejemplo,
      nuevoConcepto.urls
    );

    cargarDatos();
    setNuevoConcepto({
      nombre: "",
      descripcion: "",
      ejemplo: "",
      urls: [],
    });
  };

  return (
    <div className="app">
      <div>
        <form  onSubmit={handleSubmit}>
            <input  className="input-buscar" type="text" value={busqueda} onChange={handleChange} />
          <button type="submit">Buscar</button>
        </form>
        {resultado  && false? (
          <div>
            <h3>Resultado:</h3>
            <p>Nombre: {resultado.nombre}</p>
            <p>Descripción: {resultado.descripcion}</p>
            <p>Ejemplo: {resultado.ejemplo}</p>
            <p>URLs:</p>
            <ul>
              {resultado &&
                resultado.urls &&
                resultado.urls.map((url, index) => <li key={index}>{url}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
      {
        mostrarAñadir  ? (
            <div>
            <h2>Crear Concepto</h2>
            <form onSubmit={handleNuevoConceptoSubmit}>
            <Input state={nuevoConcepto.nombre} nombre="nombre" funcion={handleNuevoConceptoChange} />
            <Input state={nuevoConcepto.descripcion} nombre="descripcion" funcion={handleNuevoConceptoChange} />
            <Input state={nuevoConcepto.ejemplo} nombre="ejemplo" funcion={handleNuevoConceptoChange} />

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
                <button type="button" onClick={handleAddUrl}>
                  Agregar URL
                </button>
              </label>
              <button type="submit">Crear Concepto.</button>
            </form>
          </div>
        ) :  <button onClick={() =>  setMostrarAñadir(true)}>añadir</button>
      }
    </div>
  );
};

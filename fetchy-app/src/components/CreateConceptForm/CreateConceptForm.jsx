import React from "react";
import PropTypes from "prop-types";

export const CreateConceptForm = ({
  nuevoConcepto,
  handleNuevoConceptoChange,
  handleAddUrl,
  handleUrlChange,
  handleNuevoConceptoSubmit,
  mostrarAñadir,
}) => {
  return (
    <div className="contenedor-añadir-concepto">
      {mostrarAñadir && (
        <form
          className="form-añadir-concepto"
          onSubmit={handleNuevoConceptoSubmit}
        >
          <div class="input-container">
            <input
              type="text"
              id="input"
              name="nombre"
              required=""
              value={nuevoConcepto.nombre}
              onChange={handleNuevoConceptoChange}
            />
            <label for="input" class="label">
              nombre
            </label>
            <div class="underline"></div>
          </div>

          <div class="input-container">
            <input
              type="text"
              id="input"
              name="descripcion"
              required=""
              value={nuevoConcepto.descripcion}
              onChange={handleNuevoConceptoChange}
            />
            <label for="input" class="label">
              descripcion
            </label>
            <div class="underline"></div>
          </div>

          <div class="input-container">
            <input
              type="text"
              id="input"
              name="ejemplo"
              required=""
              value={nuevoConcepto.ejemplo}
              onChange={handleNuevoConceptoChange}
            />
            <label for="input" class="label">
              ejemplo
            </label>
            <div class="underline"></div>
          </div>

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
      )}
    </div>
  );
};

CreateConceptForm.propTypes = {
  nuevoConcepto: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    ejemplo: PropTypes.string.isRequired,
    urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleNuevoConceptoChange: PropTypes.func.isRequired,
  handleAddUrl: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleNuevoConceptoSubmit: PropTypes.func.isRequired,
};

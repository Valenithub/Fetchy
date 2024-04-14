import React from "react";
import PropTypes from "prop-types";
import "../styles/app.css";

const CreateConceptForm = ({
    nuevoConcepto,
    handleNuevoConceptoChange,
    handleAddUrl,
    handleUrlChange,
    handleNuevoConceptoSubmit,
}) => {
    return (
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

export default CreateConceptForm;

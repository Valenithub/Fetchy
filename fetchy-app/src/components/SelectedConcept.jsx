import React from "react";
import PropTypes from "prop-types";
import "../styles/app.css";

const SelectedConcept = ({ conceptoSeleccionado }) => {
    return (
        <div>
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
    );
};

SelectedConcept.propTypes = {
    conceptoSeleccionado: PropTypes.object,
};

export default SelectedConcept;

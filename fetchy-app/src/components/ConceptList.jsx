import React from "react";
import PropTypes from "prop-types";
import "../styles/app.css";

const ConceptList = ({ resultado, handleConceptoSeleccionado }) => {
    return (
        <div>
            {resultado && resultado.length > 0 && (
                <ul>
                    {resultado.map((concepto, index) => (
                        <li key={index} className="concepto-coincidente" onClick={() => handleConceptoSeleccionado(concepto)}>
                            {concepto.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

ConceptList.propTypes = {
    resultado: PropTypes.array.isRequired,
    handleConceptoSeleccionado: PropTypes.func.isRequired,
};

export default ConceptList;

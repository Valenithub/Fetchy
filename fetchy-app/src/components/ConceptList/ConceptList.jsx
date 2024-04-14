import PropTypes from "prop-types";
export const ConceptList = ({mostrarAñadir, resultado, handleConceptoSeleccionado }) => {
    return (
        <>
            {
                !mostrarAñadir && (        <div className="contenedor-generar-lista-nombre-conceptos">
                {resultado && resultado.length > 0 && (
                    <ul className="ul-lista-conceptos">
                        {resultado.map((concepto, index) => (
                            <li key={index} className="concepto-coincidente" onClick={() => handleConceptoSeleccionado(concepto)}>
                                {concepto.nombre}
                            </li>
                        ))}
                    </ul>
                )}
            </div>)
            }
        </>
    );
};

ConceptList.propTypes = {
    mostrarAñadir: PropTypes.bool.isRequired,
    resultado: PropTypes.array.isRequired,
    handleConceptoSeleccionado: PropTypes.func.isRequired,
};


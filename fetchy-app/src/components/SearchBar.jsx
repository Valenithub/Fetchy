import React from "react";
import PropTypes from "prop-types";
import "../styles/app.css";

const SearchBar = ({ busqueda, handleChange, handleBuscar, handleKeyPress }) => {
    return (
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
        </div>
    );
};

SearchBar.propTypes = {
    busqueda: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBuscar: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
};

export default SearchBar;

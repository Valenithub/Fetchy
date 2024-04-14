import React from "react";
import PropTypes from "prop-types";
import "./Searchbar.css";
export const SearchBar = ({
  mostrarAñadir,
  busqueda,
  handleChange,
  handleBuscar,
  handleKeyPress,
  setMostrarAñadir
}) => {
  return (
   <div style={{height:"200px",display:"flex",alignItems:"center",}}>
     {
      !mostrarAñadir && (<div style={{display:"flex",alignItems:"center"}}>
      <form class="form">
    <label for="search">
      <input
      value={busqueda}
      onChange={handleChange}
        required=""
        autocomplete="off"
        placeholder="search your chats"
        id="search"
        type="text"
      />
      <button type="reset" class="close-btn" onClick={handleBuscar}>
        <svg
          viewBox="0 0 20 20"
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </label>
  </form>
  <button className="button" onClick={()=> setMostrarAñadir(true)}>añdir </button>
  </div>)
     }
   </div>

  );
};

SearchBar.propTypes = {
  busqueda: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBuscar: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

import React from 'react'

export const Input = ({state,nombre,funcion}) => {
  return (
    <div class="input-container">
    <input placeholder="Enter text" class="input-field" name={nombre} type="text" value={state} onChange={funcion}/>
    <label for="input-field" class="input-label">{nombre}: </label>
    <span class="input-highlight"></span>
  </div>
  )
}

const express = require('express');
const app = express();

// Configurar middleware
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Definir rutas
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

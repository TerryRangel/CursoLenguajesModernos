import express from 'express'
import usuarioRoutes from "./routes/usuaurio.routes"//const cors = require('cors');
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();




const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

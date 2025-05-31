const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI cargado:', MONGO_URI);

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

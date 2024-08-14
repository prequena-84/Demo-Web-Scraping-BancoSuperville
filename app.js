const express = require('express');
const serviceScraping1 = require('./app/scraping-1');
const app = express();
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env.dev') });

app.all('/', (req, res) => {
    res.send("Bienvenido a la API WS Superville")
});

app.use(cors());
app.use('/sv', serviceScraping1);

const servidor = app.listen(process.env.Port || 3000, () => {
    console.log(`Servidor corriendo en el puerto ${servidor.address().port}`);
});
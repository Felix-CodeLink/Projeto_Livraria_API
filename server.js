const express = require('express');
const {DatabaseConnection} = require('./config/db.js')
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/api', userRoutes)


Promise.all([DatabaseConnection.connect()]).then(() => {

    app.listen(PORT, () => {
        console.log(`Server rodando na porta ${PORT}`)
    })
}).catch((err) => {
    console.error('Erro ao iniciar o servidor', err);
    process.exit(1)
})
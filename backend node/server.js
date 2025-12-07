import 'dotenv/config';
import app from './app.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {dbname: 'CataGolpeDB'})
.then(() => { 

    console.log('Conectado ao mongoDB');

    app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    });
})
.catch(err => console.log("Erro na conexao", err.message));



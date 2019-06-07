const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://oslo:98221958@cluster0-8xls0.azure.mongodb.net/test?retryWrites=true&w=majority";

const dbName = 'bancoOslo';
const collectionName = 'valor';
const DatabaseService = require('./services/database').DatabaseService;

const databaseService = new DatabaseService();

app.use(bodyParser.urlencoded({ 
    extended: true,
}));

app.use(bodyParser.json());

//Ler (GET) - Seleciona um ou mais valores para exibir
app.get('/values/', async (req, res) => {
    let response = await databaseService.getValores();
    res.json(response);
});

//Criar (POST) - Insere um valor no Banco de Dados
app.post('/values/', async (req, res) => {
    const valor = req.body.valor;
    await databaseService.insertValor(valor);
    res.send(`Valor ${valor} inserido com sucesso`);
});
//Excluir (DELETE) - Remover um valor
app.delete('/values/', async (req, res) => {
    
    const valor = "5cf734b36dfe5e1d85aeec9e"; //Como não há frontend para deletar, estou passando a key na mão.
    //const valor = req.body.valor; --> Assim eu faria caso houvesse esta situação no front, pegaria o id pelo body da requisição

    await databaseService.removeValor(valor);
    res.send('Valor deletado.');
});

//Atualizr (PUT) - Altera um valor no Banco de Dados
app.put('/values', async (req, res) => {

    const valor = "5cf7370f6dfe5e1d85aeec9f"; //Como não há frontend para atualizar valores, estou passando a key na mão
    //const valor = req.body.valor; --> Assim eu faria caso houvesse esta situação no front, pegaria o id pelo body da requisição

    await databaseService.updateValor(valor);
    res.send('Valor atualizado');
});

app.listen(9000, () => {
    console.log('API rodando na porta 9000: http://localhost:9000');
});
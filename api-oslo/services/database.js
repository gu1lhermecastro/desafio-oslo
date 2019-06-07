const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://oslo:98221958@cluster0-8xls0.azure.mongodb.net/test?retryWrites=true&w=majority";

const dbName = 'bancoOslo';
const collectionName = 'valor';

class DatabaseService {
    constructor () {
        this.db;
        this.valorCollection;

        MongoClient.connect(uri).then(db => {
            this.db = db;
            this.valorCollection = this.db.db(dbName).collection(collectionName);
        });
    };

    async getValores() {
        return this.valorCollection.find().toArray();
    };

    async insertValor(valorDaRequisicao) {
        return this.valorCollection.insertOne({valor: valorDaRequisicao});
    };

    async updateValor(valorDaRequisicao) {
        return this.valorCollection.updateOne({"_id": ObjectID(valorDaRequisicao)}, { $set: {"_id": ObjectID(valorDaRequisicao), valor: "Atualizando"}});
    };

    async removeValor(valorDaRequisicao) {
        return this.valorCollection.deleteOne({"_id": ObjectID(valorDaRequisicao)});
    };
};

module.exports = {
    DatabaseService: DatabaseService
};
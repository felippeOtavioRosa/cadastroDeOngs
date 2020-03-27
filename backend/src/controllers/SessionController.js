const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body; //busca o id digitado através do corpo da requisição

        const ong = await connection('ongs') // buscar uma ong no BD onde
            .where('id',id) // onde o id do corpo da requisição seja igual ao que tenha no BD
            .select('name') // irá selecionar o nome da ong
            .first(); // apenas a primeira informação

        if (!ong) { //se o id não for identificado
            return response.status(400).json({error: 'Not ONG found with this ID'}); //retornar status 400
        }

        return response.json(ong); // caso contrário retornar o nome da ONG
    }
}
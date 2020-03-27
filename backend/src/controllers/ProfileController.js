const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents') // variável incidents fará conexão com a BD incidents
            .where('ong_id',ong_id) // onde o id da ong logada = ong_id  na BD
            .select('*'); // selecionar todos os dados

        return response.json(incidents); // retornara a variável incidents
    }
}
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query; //buscar de dentro do request.query um parâmetro chamado page, se ele não existir, usar por padrão o parâmetro 1 (página 1)

        const [count] = await connection('incidents').count(); // cria um contador para contar o total de registros

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', "=", "incidents.ong_id") // join é utilizado quendo queremos usar dados de duas tabelas, estou solicitando os dados da tabela ongos onde o ong_id seja igual oas dados de incidents.id
            .limit(5) // limitar a busca para apenas 5 registos/incidents 
            .offset((page - 1) * 5) // preciso pular 5 registros por página, porém na pg 1 não posso multiplicar page por 5 (tem que ser 0), ou seja, ele vai partir do 0 e pegar os 5 próximos registros, na segunda página ele vai pular os 5 primeiro e pegar os 5 próximos e assim por diante.
            .select(['incidents.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf']);//Selecionar todos os campos de todos os registros dentro da tabela ongs

        response.header('X-Total-Count', count['count(*)']); // retorna o total de incidents no cabeçalho do frontend

        return response.json(incidents);
    },

    async create (request, response) {
        const {title, description, value} = request.body; // cria uma variável que servirá para armazenar os dados cadastrados

        const ong_id = request.headers.authorization; // irá identificar o id da ong que criará a requisição

        const [id] = await connection('incidents').insert({ //cria uma variável "id" para fazer conexão com o BD 
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id }); //retorna a variável "id"
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents') //irá criar uma variável chamada incident com conexão com a BD incidents
            .where('id', id) // onde o id da BD for igual ao id logado
            .select('ong_id') // selecionar apenas o "ong_id"
            .first(); // primeiro resultado, pois terá apenas um resultado

        if (incident.ong_id != ong_id) { // se o ong_id desse incidente for diferente do ong_id logado
            return response.status(401).json({ error: 'operation not permitted' }); //retorna erro 401 e informa o erro
        }

        await connection('incidents').where('id', id).delete(); // se não retornou erro, deletar o incidente

        return response.status(204).send();
    }
};
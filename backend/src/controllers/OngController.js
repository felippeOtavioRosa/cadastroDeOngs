const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const ongs = await connection ('ongs').select('*');//lelecionar todos os campos de todos os registros dentro da tabela ongs
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');// variável id = criar uma chave de 4 byte e converter para string do tipo Hexadecimal

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};
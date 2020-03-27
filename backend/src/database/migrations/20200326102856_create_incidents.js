
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) { //incidents é o nome da tabela que está sendo criada
        table.increments(); // cria uma chave alfa numérica auto incrementada 
        
        table.string('title').notNullable(); 
        table.string('description').notNullable(); 
        table.decimal('value').notNullable(); //decimal = float

        table.string('ong_id').notNullable(); //irá referenciar o id da ong que criou o incidente, fazendo um relacionamento com a tabela ongs

        table.foreign('ong_id').references('id').inTable('ongs'); //irá preencher o campo ong_id com a informação da tabela extrangeira de referência id na tabela ong
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};

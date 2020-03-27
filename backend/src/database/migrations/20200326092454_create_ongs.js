
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) { //ongs é o nome da tabela que está sendo criada
        table.string('id').primary(); // tipo string (sequencia de caracteres) de chamve primária, ou seja, o sistema incluirá um valor automático para essa variável
        table.string('name').notNullable();// notnulabele significa que o campo não pode ficar em branco.
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();//segunda variável (,2) obriga o campo a ter 2 caracteres
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};

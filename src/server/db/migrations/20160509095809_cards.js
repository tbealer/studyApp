exports.up = function(knex, Promise) {
  
  return knex.schema.createTable('cards', function(table){
    
    table.increments('id').primary();
    
    table.string('question');

    table.string('answer');

    table.integer('deckid').unsigned();
    
    table.foreign('deckid')
      .references('id')
      .inTable('decks');
    
    
  });
};

exports.down = function(knex, Promise) {
  
  return knex.schema.dropTable('cards');

};
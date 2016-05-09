exports.up = function(knex, Promise) {
  
  return knex.schema.createTable('games', function(table){
    
    table.increments('id').primary();
    
    table.integer('score');

    table.integer('deckid').unsigned();
    
    table.foreign('deckid')
      .references('id')
      .inTable('decks');
    
    
  });
};

exports.down = function(knex, Promise) {
  
  return knex.schema.dropTable('games');

};
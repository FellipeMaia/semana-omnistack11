
exports.up = function(knex) {
    knex.schema.table('incidents', function (table) {
        table.renameColumn('velue','value');
    })
};

exports.down = function(knex) {
    knex.schema.table('incidents', function (table) {
        table.renameColumn('value','velue');
    })
};

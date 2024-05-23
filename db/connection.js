import  knex from "knex";

export const Knex = knex({
	client: 'sqlite3',
	connection: ':memory:',
	useNullAsDefault: true
});

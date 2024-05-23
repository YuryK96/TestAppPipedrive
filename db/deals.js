import {Knex} from "./connection.js";


async function createTable() {
	const tableExists = await Knex.schema.hasTable('deals');

	if (tableExists) {
		return;
	}

	await Knex.schema.createTable('deals', table => {
		table.increments('id').primary();
		table.integer('userId').unsigned().references('userId').inTable('users');
		table.integer('dealId');
		table.text('name');
		table.text('surname');
		table.text('tel');
		table.text('email');
		table.text('jobType');
		table.text('jobSource');
		table.text('jobDescription');
		table.text('address');
		table.text('location');
		table.text('street');
		table.text('postCode');
		table.text('date');
		table.text('fromTime');
		table.text('toTime');
		table.text('person');
		table.text('district');
	});
}

async function getDealByIds(userId,dealId) {
	const deal = await Knex.from('deals').where('userId', userId).andWhere('dealId', dealId).first();

	return deal;
}

async function addDeal(data) {
	await Knex('deals').insert(data);
}

export default {addDeal,getDealByIds,createTable}

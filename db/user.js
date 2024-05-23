import {Knex} from "./connection.js";


async function createTable() {
    const tableExists = await Knex.schema.hasTable('users');

    if (tableExists) {
        return;
    }

    await Knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.text('userId').unique();
        table.text('username');
        table.text('access_token');
        table.text('refresh_token');
    });
}

async function getById(id) {
    const user = await Knex.from('users').select().where('userId', id).first();

    return user;
}

async function add(username, userId, access_token, refresh_token) {
    const isExistUser = await getById(userId)
    if (isExistUser) {
        return
    }

    await Knex('users').insert({
        username,
        userId,
        access_token,
        refresh_token
    });
}

export default {add, getById, createTable}

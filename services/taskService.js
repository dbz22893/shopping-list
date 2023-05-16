import { sql } from "../database/database.js";

const create = async(name) => {
    await sql `INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllShopping_lists = async() => {
    return await sql `SELECT * FROM shopping_lists WHERE active = TRUE`;
};
const findById = async(id) => {
    const rows = await sql `SELECT * FROM shopping_lists WHERE id = ${ id }`;

    if (rows && rows.length > 0) {
        return rows[0];
    }

    return { id: 0, name: "Unknown" };
};

const numberofshoppinglists = async() => {
    const numbers = await sql `SELECT COUNT(*) AS count FROM shopping_lists;`;
    if (numbers && numbers.length > 0) {
        return numbers[0];
    }

    return { id: 0, name: "Unknown" };
};

export { create, findAllShopping_lists, findById, numberofshoppinglists };
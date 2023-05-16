import { sql } from "../database/database.js";

const createitem = async(shopping_list_id, name) => {
    await sql `INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${shopping_list_id}, ${name})`;
};

const findAllitems = async(shopping_list_id) => {
    return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id}`;
};

const deleteitem = async(id) => {
    return await sql `UPDATE shopping_list_items SET collected = TRUE WHERE id = ${id}`;
};

const numberofshoppinglistitems = async() => {
    const numbers = await sql `SELECT COUNT(*) AS count FROM shopping_list_items;`;
    if (numbers && numbers.length > 0) {
        return numbers[0];
    }

    return { id: 0, name: "Unknown" };
};



export { createitem, findAllitems, deleteitem, numberofshoppinglistitems };
const client = require('../client');

async function getOrderMenuItemById(id) {
    try {
        const { rows: [orderMenuItem] } = await client.query(`
            SELECT *
            FROM order_menu_items
            WHERE id=$1;
        `, [id]);

        return orderMenuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addMenuItemToOrder({
    menuItemId,
    orderId,
    pricePerItemInCents,
    quantity
}) {
    try {
        const { rows: [orderMenuItem] } = await client.query(`
            INSERT INTO order_menu_items("menuItemId", "orderId", "pricePerItemInCents", quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [menuItemId, orderId, pricePerItemInCents, quantity]);

        return orderMenuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getOrderMenuItemsByOrder(orderId) {
    try {
        const { rows: orderMenuItems } = await client.query(`
            SELECT *
            FROM order_menu_items
            WHERE "orderId"=$1;
        `, [orderId]);

        return orderMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getOrderMenuItemsByMenuItem(menuItemId) {
    try {
        const { rows: orderMenuItems } = await client.query(`
            SELECT *
            FROM order_menu_items
            WHERE "menuItemId"=$1;
        `, [menuItemId]);

        return orderMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function destroyOrderMenuItem(id) {
    try {
        const { rows: [deletedOrderMenuItem] } = await client.query(`
            DELETE FROM order_menu_items
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return deletedOrderMenuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getOrderMenuItemById,
    getOrderMenuItemsByOrder,
    getOrderMenuItemsByMenuItem,
    addMenuItemToOrder,
    destroyOrderMenuItem
};
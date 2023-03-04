// grab our db client connection to use with our adapters
const client = require('../client');
const { attachMenuItemsToOrder } = require('./menu_items');

async function getAllOrders() {
    /* this adapter should fetch a list of users from your db */
    try {
        const { rows: orders } = await client.query(`
        SELECT *
        FROM orders;
        `);

        const ordersWithMenuItems = await attachMenuItemsToOrder(orders);
        return ordersWithMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getOrderById(id) {
    try {
        const { rows: [orders] } = await client.query(`
        SELECT *
        FROM orders
        WHERE id = $1;
        `, [id]);

        const ordersWithMenuItems = await attachMenuItemsToOrder(orders);
        return ordersWithMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getOrdersByBuyerId(buyerId) {
    try {
        const { rows: orders } = await client.query(`
        SELECT *
        FROM orders
        WHERE "buyerId" = $1;
        `, [buyerId]);

        const ordersWithMenuItems = await attachMenuItemsToOrder(orders);
        return ordersWithMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getOrdersByOrderDate(orderDate) {
    try {
        const { rows: orders } = await client.query(`
        SELECT *
        FROM orders
        WHERE "orderPlacedOn" = $1;
        `, [orderDate]);

        const ordersWithMenuItems = await attachMenuItemsToOrder(orders);
        return ordersWithMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getOrdersByOrderStatus(orderStatus) {
    try {
        const { rows: orders } = await client.query(`
        SELECT *
        FROM orders
        WHERE status = $1;
        `, [orderStatus]);

        const ordersWithMenuItems = await attachMenuItemsToOrder(orders);
        return ordersWithMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createOrder({
    buyerId, orderPlacedOn
}) {
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders("buyerId", "orderPlacedOn")
        VALUES ($1, $2)
        RETURNING *;
        `, [buyerId, orderPlacedOn]);

        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function editOrderStatus({
    status, id
}) {
    try {
        const { rows: [order] } = await client.query(`
                UPDATE orders
                SET status = $1
                WHERE id = $2
                RETURNING *;
            `, [status, id]);

        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    // add your database adapter fns here
    getAllOrders,
    getOrderById,
    getOrdersByBuyerId,
    getOrdersByOrderDate,
    getOrdersByOrderStatus,
    createOrder,
    editOrderStatus
};

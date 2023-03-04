// grab our db client connection to use with our adapters
const client = require('../client');

async function getUserMenuItemById(id) {
    try {
        const { rows: [userMenuItem] } = await client.query(`
        SELECT *
        FROM user_menu_items
        WHERE id = $1;
        `, [id]);

        return userMenuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserMenuItemsByUserId(userId) {
    try {
        const { rows: userMenuItems } = await client.query(`
        SELECT *
        FROM user_menu_items
        WHERE "userId" = $1;
        `, [userId]);

        return userMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserMenuItemsByMenuItemId(MenuItemId) {
    try {
        const { rows: userMenuItems } = await client.query(`
        SELECT *
        FROM user_menu_items
        WHERE "MenuItemId" = $1;
        `, [MenuItemId]);

        return userMenuItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteMenuItemFromUser(userMenuItemId) {
    try {
        const { rows: [userMenuItem] } = await client.query(`
            DELETE FROM user_menu_items
            WHERE id = $1
            RETURNING *;
        `, [userMenuItemId]);

        return userMenuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addMenuItemToUser({
    userId,
    menuItemId,
    quantity,
}) {
    try {
        const { rows: [userMenuItem] } = await client.query(`
            INSERT INTO user_menu_items("userId", "menuItemId", quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT ("userId", "menuItemId") DO NOTHING
            RETURNING *;
        `, [userId, menuItemId, quantity]);
    
        return userMenuItem;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function editUserMenuItem({ userMenuItemId, quantity }) {
    try {
        const { rows: [menuItem] } = await client.query(`
            UPDATE user_menu_items
            SET quantity = $2
            WHERE id = $1
            returning *;
        `, [userMenuItemId, quantity]);

        return menuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    getUserMenuItemById,
    getUserMenuItemsByUserId,
    getUserMenuItemsByMenuItemId,
    deleteMenuItemFromUser,
    addMenuItemToUser,
    editUserMenuItem
};
const client = require('../client');

async function getMenuItemCategoryById(id) {
    try {
        const { rows: [menuItemCategory] } = await client.query(`
            SELECT *
            FROM menu_item_categories
            WHERE id=$1;
        `, [id]);
        
        return menuItemCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addCategoryToMenuItem({
    menuItemId,
    categoryId,
}) {
    try {
        const { rows: [menuItemCategory] } = await client.query(`
            INSERT INTO menu_item_categories("menuItemId", "categoryId")
            VALUES ($1, $2)
            RETURNING *;
        `, [menuItemId, categoryId]);

        return menuItemCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getMenuItemCategoriesByCategory(categoryId) {
    try {
        const { rows: menuItemCategory } = await client.query(`
            SELECT *
            FROM menu_item_categories
            WHERE "categoryId"=$1;
        `, [categoryId]);

        return menuItemCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getMenuItemCategoriesByMenuItem(menuItemId) {
    try {
        const { rows: menuItemCategory } = await client.query(`
            SELECT *
            FROM menu_item_categories
            WHERE "menuItemId"=$1;
        `, [menuItemId]);

        return menuItemCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function destroyMenuItemCategory(id) {
    try {
        const { rows:[deletedMenuItem] } = await client.query(`
            DELETE FROM menu_item_categories
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return deletedMenuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getMenuItemCategoryById,
    addCategoryToMenuItem,
    getMenuItemCategoriesByCategory,
    getMenuItemCategoriesByMenuItem,
    destroyMenuItemCategory,
};
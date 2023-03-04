const client = require('../client');

async function getAllCategories() {
    try {
        const { rows: categories } = await client.query(`
            SELECT *
            FROM categories;
        `);

        return categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCategoryById(id) {
    try {
        const { rows: [category] } = await client.query(`
            SELECT *
            FROM categories
            WHERE id=$1;
        `, [id]);

        return category;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCategoryByName(name) {
    try {
        const { rows: [category] } = await client.query(`
            SELECT *
            FROM categories
            WHERE name=$1;
        `, [name]);

        return category;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addCategory({
    name,
    imageURL
}) {
    try {
        const { rows: [category] } = await client.query(`
            INSERT INTO categories(name, "imageURL")
            VALUES ($1, $2)
            RETURNING *;
        `, [name, imageURL]);

        return category;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateCategory({ id, name }) {
    try {
        const category = await getCategoryById(id);
        if (!category) {
            throw new Error("A category does not exist with that id");
        }
        else {
            const { rows: [updateCategory] } = await client.query(`
                UPDATE categories
                SET name=$2
                WHERE id=$1
                RETURNING *;
            `, [id, name]);

            return updateCategory;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function destroyCategory(id) {
    try {
        await client.query(`
            DELETE FROM menu_item_categories
            WHERE "categoryId"=$1
            RETURNING *;
        `, [id]);

        const { rows: [deletedCategory] } = await client.query(`
            DELETE FROM categories
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return deletedCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function attachCategoriesToMenuItems(menu_items) {
    try {
        const { rows: categories } = await client.query(`
            SELECT categories.*, menu_item_categories."menuItemId", menu_item_categories.id AS "menuItemCategoryId"
            FROM categories
            INNER JOIN menu_item_categories ON categories.id=menu_item_categories."categoryId"
        `);

        if (Array.isArray(menu_items)) {
            const menuItemsWithCategories = menu_items.map(menu_items => {
                menu_items.categories = categories.filter(category => category.menuItemId === menu_items.id);
                return menu_items;
            })

            return menuItemsWithCategories;
        } else {
            menu_items.categories = categories.filter(category => category.menuItemId === menu_items.id);
            return menu_items;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    addCategory,
    updateCategory,
    destroyCategory,
    attachCategoriesToMenuItems
};
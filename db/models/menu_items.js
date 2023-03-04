const client = require('../client');
const { attachCategoriesToMenuItems } = require('./categories');

async function getAllMenuItems() {

    try {
        const { rows: menuItems } = await client.query(`
            SELECT * 
            FROM menu_items
        `);

        const menuItemsWithCategories = await attachCategoriesToMenuItems(menuItems)

        return menuItemsWithCategories;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getMenuItemById(id) {

    try {
        const { rows: [menuItems] } = await client.query(`
            SELECT * 
            FROM menu_items
            WHERE id = $1;
        `, [id]);

        const menuItemsWithCategories = await attachCategoriesToMenuItems(menuItems)
        return menuItemsWithCategories;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getMenuItemsByCategory(categoryId) {
    try {
        const { rows: menuItems } = await client.query(`
            SELECT menu_items.*, menu_item_categories."categoryId", menu_item_categories.id AS "menuItemCategoryId"
            FROM menu_items
            INNER JOIN menu_item_categories ON menu_items.id=menu_item_categories."menuItemId"
        `);

        const filteredMenuItems = menuItems.filter(menuItem => {
            return menuItem.categoryId == categoryId  
        })

        return filteredMenuItems
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addMenuItem({ name, description, imageURL, priceInCents, inventoryQuantity }) {

    try {
        const { rows: [menuItem] } = await client.query(`
            INSERT INTO menu_items (name, description, "imageURL", "priceInCents", "inventoryQuantity")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [name, description, imageURL, priceInCents, inventoryQuantity]);
    
        return menuItem;
        
    } catch (error) {
        console.log(error);
        throw error;
    }

}

async function deleteMenuItem(id) {
    try {
        await client.query(`
            DELETE FROM user_menu_items
            WHERE "menuItemId" = $1;
        `, [id]);

        const { rows:[deletedMenuItem] } = await client.query(`
            DELETE FROM menu_items
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return deletedMenuItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function editMenuItem({ id, ...fields }) {

    try {
        const setString = Object.keys(fields)
            .map((key, index) => `"${key}" = $${index + 2}`)
            .join(', ');
    
        if (setString.length > 0) {
    
            const { rows: [menuItem] } = await client.query(`
                UPDATE menu_items
                SET ${setString}
                WHERE id = $1
                RETURNING *;
            `, [id, ...Object.values(fields)]);
    
            return menuItem;
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }

}

async function editMenuInventoryQuantity({ id, inventoryQuantity }) {

    try {
        const { rows: [menuItem] } = await client.query(`
            UPDATE menu_items
            SET "inventoryQuantity" = $2
            WHERE id = $1
            RETURNING *;
        `, [id, inventoryQuantity]);

        return menuItem;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function attachMenuItemsToOrder(orders) {
    try {
      const { rows: menuItems } = await client.query(`
          SELECT menu_items.*, order_menu_items."orderId", order_menu_items."pricePerItemInCents", order_menu_items.quantity, order_menu_items.id AS "ordermenuItemId"
          FROM menu_items
          INNER JOIN order_menu_items ON menu_items.id=order_menu_items."menuItemId"
        `);
  
      const ordersWithMenuItems = orders.map(order => {
        order.menuItems = menuItems.filter(menuItem => menuItem.orderId === order.id);
        return order;
      })
      
      return ordersWithMenuItems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    getMenuItemsByCategory,
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
    editMenuInventoryQuantity,    
    attachMenuItemsToOrder
}

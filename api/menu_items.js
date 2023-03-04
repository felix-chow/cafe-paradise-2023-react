const express = require('express');
const router = express.Router();
const { 
    getAllMenuItems,
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
    getMenuItemById,
    getMenuItemsByCategory,
    editMenuInventoryQuantity
} = require('../db/models/menu_items');
const {
    requireAdmin, requireUser
} = require('./utils');
const { addCategoryToMenuItem } = require('../db/models');
// const { } = require('../errors')

router.use((req, res, next) => {
    console.log("A request is being made to /menu_items");
    next();
});

// GET /api/menu_items
router.get('/', async ( req, res, next ) => {
    try {
        const menuItems = await getAllMenuItems();

        res.send(
            menuItems
        );
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// GET /api/menu_item/:menuItemId
router.get('/menu_item/:menuItemId', async ( req, res, next ) => {
    try {
        const {menuItemId} = req.params
        const menuItems = await getMenuItemById(menuItemId);

        res.send(
            menuItems
        );
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// GET /api/category/:categoryId
router.get('/category/:categoryId', async ( req, res, next ) => {
    try {
        const {categoryId} = req.params
        const menuItems = await getMenuItemsByCategory(categoryId)
        res.send(
            menuItems
        );
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// POST /api/menu_items
router.post('/', requireAdmin, async (req, res, next) => {
    const { name, description, imageURL, priceInCents, inventoryQuantity } = req.body;
    const newMenuItem = {name, description, imageURL, priceInCents, inventoryQuantity};
    const menuItem = await addMenuItem(newMenuItem);

    try {
        res.send(menuItem)
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// PATCH /api/menu_item/:menuItemId
router.patch('/:menuItemId', requireAdmin, async ( req, res, next ) => {
    try {
        const { menuItemId } = req.params;
        const { name, description, imageURL, priceInCents, inventoryQuantity } = req.body;
        
        const menuItem = await editMenuItem({id: menuItemId, name, description, imageURL, priceInCents, inventoryQuantity});
        res.send(menuItem)
        
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// PATCH /api/menu_items/:menuItemId
router.patch('/:menuItemId/quantity', requireUser, async ( req, res, next ) => {
    try {
        const { menuItemId } = req.params;
        const { inventoryQuantity } = req.body;
        
        const menuItem = await editMenuInventoryQuantity({id: menuItemId, inventoryQuantity});
        res.send(menuItem)
        
    } catch ({ name, message }) {
        next({ name, message });
    }
});


// DELETE /api/menu_items/:menuItemId
router.delete('/:menuItemId', requireAdmin, async ( req, res, next ) => {
    try {
        const { menuItemId } = req.params;
        const menuItem = await deleteMenuItem( menuItemId );
        res.send(menuItem);

    } catch ({ name, message }) {
        next({ name, message });
    }
});

router.post('/:menuItemId/categories', async (req, res, next) => {
    try {
        const { menuItemId } = req.params;
        const { categoryId } = req.body;
        const inputFields = { menuItemId, categoryId };
        const menuItemCategory = await addCategoryToMenuItem(inputFields)
        if (menuItemCategory instanceof Error) {
            res.send({
                error: "500",
                name: "DuplicateMenuItem",
                message: `MenuItem ID ${menuItemId} already exists in Category ID ${categoryId}`
            })
        }
        else {
            res.send(menuItemCategory);
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;
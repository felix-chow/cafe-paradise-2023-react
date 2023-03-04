const express = require('express');
const router = express.Router();
const {
    getUserMenuItemById,
    getUserMenuItemsByUserId,
    getUserMenuItemsByMenuItemId,
    deleteMenuItemFromUser,
    addMenuItemToUser,
    editUserMenuItem
} = require('../db/models/user_menu_items');
const { requireUser, requireAdmin } = require('./utils');
// const { } = require('../errors');

router.use((req, res, next) => {
    console.log("A request is being made to /user_menu_items");
    next();
});

// GET /api/user_menu_items/:usermenuItemId
router.get('/:userMenuItemId', async ( req, res, next ) => {
    try {
        const { usermenuItemId } = req.params;
        const menuItem = await getUserMenuItemById(usermenuItemId);

        res.send(
            menuItem
        );
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// GET /api/user_menu_items/:userId
router.get('/user/:userId', async ( req, res, next ) => {
    try {
        const {userId} = req.params;
        const menuItem = await getUserMenuItemsByUserId(userId);

        res.send(
            menuItem
        );
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// GET /api/user_menu_items/:menuItemId
router.get('/menu_item/:menuItemId', async ( req, res, next ) => {
    try {
        const {menuItemId} = req.params;
        const menuItem = await getUserMenuItemsByMenuItemId(menuItemId);

        res.send(
            menuItem
        );
    } catch ({ name, message }) {
        next({ name, message });
    }
})


// POST /api/user_menu_items
router.post('/', requireUser, async (req, res, next) => {
    console.log(req.body)
    const { userId, menuItemId, quantity } = req.body;
    const newUserMenuItem = { userId, menuItemId, quantity };
    const menuItem = await addMenuItemToUser(newUserMenuItem);
    console.log(menuItem)


    try {
        res.send(menuItem)
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// PATCH /api/user_menu_items/:usermenuItemId
router.patch('/:usermenuItemId', requireUser, async ( req, res, next ) => {
    try {
        const { usermenuItemId } = req.params;
        const { quantity } = req.body;
        const menuItem = await editUserMenuItem({ usermenuItemId, quantity });

        res.send(
            menuItem
        )
    } catch ({ name, message }) {
        next({ name, message });
    }
});


// DELETE /api/user_menu_items/:usermenuItemId
router.delete('/:userMenuItemId', async ( req, res, next ) => {
    try {
        const { usermenuItemId } = req.params;

        const _menuItem = await deleteMenuItemFromUser( usermenuItemId );
        res.send(_menuItem);

    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = router;


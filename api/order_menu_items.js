const express = require('express');
const router = express.Router();
const { getOrderMenuItemById, getOrderById, addMenuItemToOrder, getOrderMenuItemsByOrder, getOrderMenuItemsByMenuItem } = require('../db');
const { requireUser, requireAdmin } = require('./utils');

router.post('/', async (req, res, next) => {
    try {
        const { orderId, menuItemId, pricePerItemInCents, quantity } = req.body;
        const orderMenuItem = await addMenuItemToOrder({ orderId, menuItemId, pricePerItemInCents, quantity });
        res.send(
            orderMenuItem
        );
    } catch ({ name, message }) {
        next({ name, message })
    };
});

router.get('/:menuItemId', requireUser, async (req, res, next) => {
    try {
        const orderMenuItem = await getOrderMenuItemById(req.params.menuItemId);
        const order = await getOrderById(orderMenuItem.orderId)
        if (orderMenuItem && order.buyerId === req.user.id) {
            res.send(
                orderMenuItem
            );
        } else {
            res.status(403).send({
                error: 'NotTheBuyer',
                message: `User ${req.user.username} is not the buyer`,
                name: "NotTheBuyer"
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    };
});

router.get('/order/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params
        const order = await getOrderById(orderId);
        const orderMenuItem = await getOrderMenuItemsByOrder(orderId)
        if (order.buyerId !== req.user.id) {
            res.status(403).send({
                error: 'NotTheBuyer',
                message: `User is not allowed to view order`,
                name: 'NotTheBuyer'
            })
        }
        res.send(
            orderMenuItem
        )
    } catch ({ name, message }) {
        next({ name, message })
    };
});

router.get('/menu_items/:menuItemId', requireAdmin, async (req, res, next) => {
    try {
        const { menuItemId } = req.params
        const { orderId } = req.params
        const order = await getOrderById(orderId);
        const orderMenuItem = getOrderMenuItemsByMenuItem(menuItemId);
        if (order.buyerId !== req.user.id) {
            res.status(403).send({
                error: 'NotTheBuyer',
                message: `User is not allowed to view order`,
                name: 'NotTheBuyer'
            })
        }
        res.send(
            orderMenuItem
        )
    } catch ({ name, message }) {
        next({ name, message })
    };
});

module.exports = router;
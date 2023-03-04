const express = require('express');
const router = express.Router();
const {
   getAllOrders,
   getOrderById,
   getOrdersByBuyerId,
   getOrdersByOrderDate,
   getOrdersByOrderStatus,
   createOrder,
   editOrderStatus
} = require('../db/models/orders');

const { requireAdmin } = require('./utils');
const { addMenuItemToOrder } = require('../db/models');

router.use((req, res, next) => {
   console.log("A request has been sent to /checkout");
   next();
});

router.get('/', requireAdmin, async (req, res, next) => {
   try {
      const orders = await getAllOrders();

      res.send(orders);
   } catch ({ name, message }) {
      next({ name, message });
   }
});

router.get('/id/:orderId', requireAdmin, async (req, res, next) => {
   try {
      const { orderId } = req.params;
      const orders = await getOrderById(orderId);

      res.send(orders);
   } catch ({ name, message }) {
      next({ name, message });
   }
});


router.get('/date/:orderPlacedOn', requireAdmin, async (req, res, next) => {
   try {
      const { orderPlacedOn } = req.params;
      
      const order = await getOrdersByOrderDate(orderPlacedOn);
      res.send(order);

   } catch ({ name, message }) {
      next({ name, message });
   }
});

router.get('/status/:orderStatus', requireAdmin, async (req, res, next) => {
   try {
      const { orderStatus } = req.params;

      const order = await getOrdersByOrderStatus(orderStatus);

      res.send(order);
   } catch ({ name, message }) {
      next({ name, message });
   }
});

router.get('/user/:buyerId', async (req, res, next) => {
   try {
      const { buyerId } = req.params;

      const order = await getOrdersByBuyerId(buyerId)

      res.send(order);
   } catch ({ name, message }) {
      next({ name, message});
   }
});

router.post('/', async (req, res, next) => {
   try {
      const { buyerId, orderPlacedOn } = req.body;
      const newOrder = { buyerId, orderPlacedOn }

      const order = await createOrder(newOrder);

      res.send(order);
   } catch ({ name, message }) {
      next({ name, message});
   }
});

router.patch('/:orderId', async (req, res, next) => {
   try {
      const { orderStatus } = req.body;
      const { orderId } = req.params;

      const order = await editOrderStatus({status: orderStatus, id: orderId});

      res.send(order);
   } catch ({ name, message }) {
      next({ name, message});
   }
});

router.post('/:orderId/menu_items', async (req, res, next) => {
   try {
      const { orderId } = req.params;
      const { menuItemId, pricePerItemInCents, quantity } = req.body;
      const inputFields = { menuItemId, orderId, pricePerItemInCents, quantity };
      const orderMenuItem = await addMenuItemToOrder(inputFields)
      if (orderMenuItem instanceof Error) {
         res.send({
            error: "500",
            name: "DuplicateMenuItem",
            message: `MenuItem ID ${menuItemId} already exists in Order ID ${orderId}`
         })
      }
      else {
         res.send(orderMenuItem);
      }
   } catch (error) {
      next(error)
   }
});

module.exports = router;

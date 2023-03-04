const apiRouter = require('express').Router();
const { getUserById } = require('../db/models');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

apiRouter.use((req, res, next) => {
  console.log("Running middleware");
  next();
});

apiRouter.use(async (req, res, next) => {
  console.log("Defining user...");
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
      next();
  } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
          const { id } = jwt.verify(token, JWT_SECRET);

          if (id) {
              req.user = await getUserById(id);
              console.log("User definition success");
              next();
          }
      } catch ({ name, message }) {
          next({ name, message });
      }
  } else {
      next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${prefix}`
      });
  }
});

// apiRouter.get('/health', (req, res, next) => {
//   res.send({
//     healthy: true,
//   });
// });

// place your routers here

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const menuItemsRouter = require('./menu_items');
apiRouter.use('/menu_items', menuItemsRouter);

const categoriesRouter = require('./categories');
apiRouter.use('/categories', categoriesRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const menuItemCategoriesRouter = require('./menu_item_categories');
apiRouter.use('/menu_item_categories', menuItemCategoriesRouter);

const userMenuItemsRouter = require('./user_menu_items.js');
apiRouter.use('/user_menu_items', userMenuItemsRouter);

const orderMenuItemsRouter = require('./order_menu_items');
apiRouter.use('/order_menu_items', orderMenuItemsRouter);

module.exports = apiRouter;

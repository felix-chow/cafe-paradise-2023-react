const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping all tables...");
    
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS menu_item_categories;
      DROP TABLE IF EXISTS order_menu_items;
      DROP TABLE IF EXISTS user_menu_items;
      DROP TABLE IF EXISTS categories cascade;
      DROP TABLE IF EXISTS orders cascade;
      DROP TABLE IF EXISTS menu_items;
      DROP TABLE IF EXISTS users cascade;
      DROP TYPE IF EXISTS "orderStatus";
    `)

    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Building all tables...");

    // create all tables in the correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );

      CREATE TABLE menu_items(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        "imageURL" VARCHAR(255) NOT NULL,
        "priceInCents" INTEGER NOT NULL,
        "itemQuantity" INTEGER NOT NULL
      );

      CREATE TYPE "orderStatus" AS ENUM (
        'Order Received', 
        'Order Cancelled', 
        'Order Ready'
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "buyerId" INTEGER REFERENCES users(id),
        "orderPlacedOn" DATE NOT NULL,
        status "orderStatus" DEFAULT 'Order Received'
      );
      
      CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        "imageURL" VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE user_menu_items(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id),
        "menuItemId" INTEGER NOT NULL REFERENCES menu_items(id),
        quantity INTEGER NOT NULL DEFAULT 1,
        UNIQUE ("userId", "menuItemId")
      );
        
      CREATE TABLE order_menu_items(
        id SERIAL PRIMARY KEY,
        "menuItemId" INTEGER REFERENCES menu_items(id),
        "orderId" INTEGER NOT NULL REFERENCES orders(id),
        "pricePerItemInCents" INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        UNIQUE ("menuItemId", "orderId")
      );

      CREATE TABLE menu_item_categories(
        id SERIAL PRIMARY KEY,
        "menuItemId" INTEGER NOT NULL REFERENCES menu_items(id),
        "categoryId" INTEGER NOT NULL REFERENCES categories(id),
        UNIQUE ("menuItemId", "categoryId")
      );
    `)

    console.log("Finished building tables!");

  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Creating sample users...")
  try {
    const usersToCreate = [

      { email: 'lbrittain2o@nhs.uk', 
        password: '0wBosj788', 
        address: '19488 Dovetail Crossing', 
        isAdmin: true },
      { email: 'cbaglan2p@businessinsider.com', 
        password: 'v4GfYH8GO', 
        address: '0160 Marcy Junction', 
        isAdmin: false },
      { email: 'tdautry2q@amazonaws.com', 
        password: 'jys4d9', 
        address: '8984 Amoth Parkway', 
        isAdmin: false },
      { email: 'sfitzpatrick2r@ibm.com', 
        password: 'QUlZFchcou', 
        address: '0 Mallory Court', 
        isAdmin: false },
      { email: 'swashbrook2s@google.com.br', 
        password: 'FZKWNv6E4', 
        address: '663 Cascade Pass', 
        isAdmin: false },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))
    console.log("Finished creating sample users!")
  } catch (error) {
    console.error("Error creating sample users!")
    throw error
  }
}

async function createInitialMenuItems() {
  console.log("Seeding menu items...")

  const menuItemsToAdd = [
    {
      name: "Cappuccino",
      description: "A delicious cappuccino.",
      imageURL: "https://images.pexels.com/photos/433145/pexels-photo-433145.jpeg",
      priceInCents: 436,
      itemQuantity: 2
    },
    {
      name: "Espresso",
      description: "A beautiful espresso.",
      imageURL: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      priceInCents: 175,
      itemQuantity: 3
    },
    {
      name: "Latte",
      description: "A sweet latte.",
      imageURL: "https://images.pexels.com/photos/302904/pexels-photo-302904.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceInCents: 275,
      itemQuantity: 5
    },
    {
      name: "Mocha",
      description: "A very delicious mocha.",
      imageURL: "https://media.istockphoto.com/id/157675911/photo/cappuccino-topped-with-swirls-of-chocolate-sauce.jpg?s=612x612&w=0&k=20&c=606NMYMjVnTmpSnJI537_IjW3lqfNJaH7Lc9Qg0BXPU=",
      priceInCents: 345,
      itemQuantity: 4
    },
    {
      name: "Cheese Breakfast Sandwich",
      description: "A plant-based milk alternative.",
      imageURL: "https://images.heb.com/is/image/HEBGrocery/002242160?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
      priceInCents: 375,
      itemQuantity: 10
    }, {
      name: "Lettuce Tomato Breakfast Sandwich",
      description: "Meat or poultry item.",
      imageURL: "https://www.marxfoods.com/images/organic-free-range-whole-chicken_organicfreerangewholechicken-1.jpg",
      priceInCents: 345,
      itemQuantity: 11
    }]
  const menu_items = await Promise.all(menuItemsToAdd.map(addMenuItem));
  console.log("Menu items seeded: ", menu_items)
  console.log("Finished seeding menu items.")
}

async function createInitialOrders() {
  console.log("Seeding initial sample orders...")

  const ordersToCreate = [
    {
      id: "1",
      buyerId: "1",
      orderPlacedOn: "2022-11-24",
      status: "Order Received",
    },
    {
      id: "2",
      buyerId: "3",
      orderPlacedOn: "2022-12-1",
      status: "Order Cancelled"
    },
    {
      id: "3",
      buyerId: "4",
      orderPlacedOn: "2022-12-25",
      status: "Order Ready"
    }]

  await Promise.all(ordersToCreate.map((order) => {
    createOrder(
      {
        buyerId: order.buyerId, 
        orderPlacedOn: order.orderPlacedOn
      })}));
  console.log("Initial sample orders seeded")
  console.log("Finished seeding initial sample orders")
}

async function createInitialOrderMenuItems() {
  console.log("Seeding ordered menu items...")

  const orderMenuItemsToCreate = [
    {
      id: "1",
      menuItemId: "1",
      orderId: "1",
      pricePerItemInCents: "275",
      quantity: "1",
    },
    {
      id: "2",
      menuItemId: "2",
      orderId: "2",
      pricePerItemInCents: "345",
      quantity: "1",
    },
    {
      id: "3",
      menuItemId: "3",
      orderId: "3",
      pricePerItemInCents: "375",
      quantity: "1",
    }]
  await Promise.all(orderMenuItemsToCreate.map(order => addMenuItemToOrder(
    {
      menuItemId: order.menuItemId,
      orderId: order.orderId,
      pricePerItemInCents: order.pricePerItemInCents,
      quantity: order.quantity
    })));
  console.log("Order menu items seeded")
  console.log("Finished seeding order menu items.")
}

async function createInitialCategories() {
  console.log("Starting to create categories...")

  const categoriesToCreate = [
    {
      id: "1",
      name: "Hot Breakfast",
      imageURL: "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4",
    },
    {
      id: "2",
      name: "Hot Coffees",
      imageURL: "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6",
    }]
  await Promise.all(categoriesToCreate.map(category => addCategory({ name: category.name, imageURL: category.imageURL })));
  console.log("Categories created")
  console.log("Finished creating categories.")
}
async function createInitialMenuItemCategories() {
  console.log("Starting to create item categories...")

  const menuItemCategoriesToCreate = [
    {
      menuItemId: 1,
      categoryId: 2
    },
    {
      menuItemId: 2,
      categoryId: 2
    },
    {
      menuItemId: 3,
      categoryId: 2
    },
    {
      menuItemId: 4,
      categoryId: 2
    },
    {
      menuItemId: 5,
      categoryId: 1
    },
    {
      menuItemId: 6,
      categoryId: 1
    }
  ]
  await Promise.all(menuItemCategoriesToCreate.map(menuItemCategory => addCategoryToMenuItem({ menuItemId: menuItemCategory.menuItemId, categoryId: menuItemCategory.categoryId, })));
  console.log("Menu item categories created")
  console.log("Finished creating menu item categories.")
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })

    await createInitialMenuItems();
    await createInitialUsers();
    await createInitialOrders();
    await createInitialOrderMenuItems();
    await createInitialCategories();
    await createInitialMenuItemCategories();
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

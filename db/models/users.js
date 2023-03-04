const client = require('../client');
const bcrypt = require('bcrypt')

async function createUser({ email, password, address, isAdmin }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    const { rows: [user] } = await client.query(`
    INSERT INTO users(email, password, address, "isAdmin") 
    VALUES($1, $2, $3, $4) 
    ON CONFLICT (email) DO NOTHING 
    RETURNING *;
  `, [email, hashedPassword, address, isAdmin]);

    console.log(user.isAdmin);
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
    throw error
  }
}

async function loginUser(email, password) {
  try {

    const inputPassword = password

    const { rows: [user] } = await client.query(`
  SELECT email, password
  FROM users
  WHERE email=$1;
`, [email])

    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(inputPassword, hashedPassword);
    if (isValid) {
      delete user.password;
      return user;
    }
  } catch (error) {
    console.log(error);
    throw error
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
    SELECT users.*, orders.id AS "orders"
    FROM users
    LEFT JOIN orders ON users.id=orders."buyerId";
  `)

    const usersWithoutPasswords = users.map(user => {
      delete user.password
      return user
    })
    return usersWithoutPasswords

  } catch (error) {
    console.log(error);
    throw error
  }
}

async function getUserById(id) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1;
  `, [id])

    if (user) {
      delete user.password;
      return user;
    }
  } catch (error) {
    console.log(error);
    throw error
  }

}

async function getUserByEmail(email) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email]);
    return user
  } catch (error) {
    console.log(error);
    throw error
  }
}

async function updateUser({ id, ...fields }) {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error("A user does not exist with that id");
    }
    else {
      const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 2}`
      ).join(', ');

      const { rows: [updatedUser] } = await client.query(`
              UPDATE users
              SET ${setString}
              WHERE id=$1
              RETURNING *;
          `, [id, ...Object.values(fields)]);

      return updatedUser;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function setAdmin({ id, isAdmin }) {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error("A user does not exist with that id");
    }
    else {
      const { rows: [updatedUser] } = await client.query(`
              UPDATE users
              SET "isAdmin"=$2
              WHERE id=$1
              RETURNING *;
          `, [id, isAdmin]);

      return updatedUser;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    await client.query(`
          DELETE FROM user_products
          WHERE "userId" = $1;
      `, [id]);

    const { rows: [deletedUser] } = await client.query(`
          DELETE FROM users
          WHERE id = $1
          RETURNING *;
      `, [id]);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  setAdmin,
  deleteUser,
};
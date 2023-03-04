import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

// export async function getAPIHealth() {
//   try {
//     const { data } = await axios.get('/api/health');
//     return data;
//   } catch (err) {
//     console.error(err);
//     return { healthy: false };
//   }
// }

//route for running locally:
const BASE_URL = 'http://localhost:4000/api'

export async function login(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const result = await response.json();
        if (result.error){
          console.log(result.message)
          throw result.message
        }

        if(result.token){
          return result
        }
    } catch (err) {
        throw err;
    }
}

export async function register(email, password, address) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                address
            })
        })

        const result = await response.json();

        if (result.error){
          console.log(result.message)
          throw result.message
        }

        if(result.token){
          return result
        }

    } catch (err) {
        throw err;
    }
}

export async function editUser(userId, email, address, token) {
  try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            email,
            address
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return result;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function setAdmin(userId, isAdmin, token) {
  try {
      const response = await fetch(`${BASE_URL}/users/admin/${userId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            isAdmin
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return result;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function fetchAllUsers(token) {
  try {
      const response = await fetch(`${BASE_URL}/users/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchUserInfo(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });
        const result = await response.json();
        if (result.id) {
            return result;
        }
        else {
            console.log(result.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function destroyUser(userId, token) {
  try {
      const response = await fetch(`${BASE_URL}/users/delete/${userId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function fetchOrdersByBuyerId(userId, token) {
  try {
      const response = await fetch(`${BASE_URL}/users/${userId}/orders`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchAllMenuItems() {
  try {
      const response = await fetch(`${BASE_URL}/menu_items`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchMenuItemById(menuItemId) {
  try {
      const response = await fetch(`${BASE_URL}/menu_items/menu_item/${menuItemId}`)
      const result = await response.json();
      if (result.error) {
        return result.message;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchMenuItemsByCategory(categoryId) {
  try {
      const response = await fetch(`${BASE_URL}/menu_items/category/${categoryId}`)
      const result = await response.json();
      if (result.error) {
        return result.message;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function addMenuItem(name, description, imageURL, priceInCents, quantity, token) {
  try {
      const response = await fetch(`${BASE_URL}/menu_items`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
              name,
              description,
              imageURL,
              priceInCents,
              quantity
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } catch (err) {
      throw err;
  }
}

export async function editMenuItem(menuItemId, name, description, imageURL, priceInCents, quantity, token) {
  try {
      const response = await fetch(`${BASE_URL}/menu_items/${menuItemId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            name,
            description,
            imageURL,
            priceInCents,
            quantity
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function editMenuItemInventory(menuItemId, quantity, token) {
  try {
      const response = await fetch(`${BASE_URL}/menu_items/${menuItemId}/quantity`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            quantity
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function deleteMenuItem(menuItemId, token) {
  try {
      const response = await fetch(`${BASE_URL}/menu_items/${menuItemId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function addCategoryToMenuItem(menuItemId, categoryId, token) {
  try {
      const response = await fetch(`${BASE_URL}/menu_items/${menuItemId}/categories`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              categoryId
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchAllCategories() {
  try {
      const response = await fetch(`${BASE_URL}/categories`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchCategoryByName(categoryName) {
  try {
      const response = await fetch(`${BASE_URL}/categories/name/${categoryName}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchCategoryById(categoryId) {
  try {
      const response = await fetch(`${BASE_URL}/categories/id/${categoryId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function addCategory(name, imageURL, token) {
  try {
      const response = await fetch(`${BASE_URL}/categories`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
              name,
              imageURL
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } catch (err) {
      throw err;
  }
}

export async function editCategory(categoryId, name, token) {
  try {
      const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            name
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function deleteCategory(categoryId, token) {
  try {
      const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function fetchAllOrders(token) {
  try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchOrderById(orderId) {
  try {
      const response = await fetch(`${BASE_URL}/orders/id/${orderId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchOrderByOrderDate(orderPlacedOn) {
  try {
      const response = await fetch(`${BASE_URL}/orders/date/${orderPlacedOn}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchOrderByStatus(orderStatus) {
  try {
      const response = await fetch(`${BASE_URL}/orders/status/${orderStatus}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function addOrder(buyerId, orderPlacedOn, token) {
  try {
      const response = await fetch(`${BASE_URL}/orders`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
              buyerId,
              orderPlacedOn
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
           return false;
       }
       else {
          return result;
       }
  } catch (err) {
      throw err;
  }
}

export async function editOrder(orderId, orderStatus, token) {
  try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            orderStatus
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function addMenuItemToOrder(menuItemId, orderId, pricePerItemInCents, quantity, token) {
  try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}/menu_items`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            menuItemId, 
            pricePerItemInCents, 
            quantity
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchMenuItemCategoriesById(menuItemCategoryId) {
  try {
      const response = await fetch(`${BASE_URL}/menu_item_categories/${menuItemCategoryId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchMenuItemCategoriesByMenuItem(menuItemId) {
  try {
      const response = await fetch(`${BASE_URL}/menu_item_categories/menu_item/${menuItemId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchMenuItemCategoriesByCategory(categoryId) {
  try {
      const response = await fetch(`${BASE_URL}/menu_item_categories/category/${categoryId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function createMenuItemCategory(menuItemId, categoryId, token) {
  try {
      const response = await fetch(`${BASE_URL}/menu_item_categories/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            menuItemId,
              categoryId
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } catch (err) {
      throw err;
  }
}

export async function deleteMenuItemCategory(menuItemCategoryId, token) {
  try {
      const response = await fetch(`${BASE_URL}/menu_item_categories/${menuItemCategoryId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function fetchUserMenuItemById(userMenuItemId) {
  try {
      const response = await fetch(`${BASE_URL}/user_menu_items/${userMenuItemId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchUserMenuItemByUser(userId) {
  try {
      const response = await fetch(`${BASE_URL}/user_menu_items/user/${userId}`)
      const result = await response.json();
      return result;
  } catch (err) {
      throw err;
  }
}

export async function fetchUserMenuItemByMenuItem(MenuItemId) {
  try {
      const response = await fetch(`${BASE_URL}/user_menu_items/menu_item/${MenuItemId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function addToCart(userId, menuItemId, quantity, token) {
  try {
      const response = await fetch(`${BASE_URL}/user_menu_items/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
              userId,
              menuItemId,
              quantity
          })
      });
      const result = await response.json();
      console.log(result)
      // return result;
      if (result.error) {
          alert(result.message);
          return false;
      }
      else {
          return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function editQuantity(userMenuItemId, quantity, token) {
  try {
      const response = await fetch(`${BASE_URL}/user_menu_items/${userMenuItemId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
            quantity
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function removeFromCart(userMenuItemId, token) {
  try {
      const response = await fetch(`${BASE_URL}/user_menu_items/${userMenuItemId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return result;
      }
  } 
  catch (err) {
      console.error(err)
  }
}

export async function fetchOrderMenuItemById(orderMenuItemId) {
  try {
      const response = await fetch(`${BASE_URL}/order_menu_items/${orderMenuItemId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchOrderMenuItemsByOrder(orderId) {
  try {
      const response = await fetch(`${BASE_URL}/order_menu_items/order/${orderId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function fetchOrderMenuItemByMenuItem(menuItemId) {
  try {
      const response = await fetch(`${BASE_URL}/order_menu_items/menu_item/${menuItemId}`)
      const result = await response.json();
      if (result.error) {
        console.log(result.message);
        return false;
      }
      else {
        return result;
      }
  } catch (err) {
      throw err;
  }
}

export async function createOrderMenuItem(orderId, menuItemId, pricePerItemInCents, quantity, token) {
  try {
      const response = await fetch(`${BASE_URL}/order_menu_items`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body: JSON.stringify({
              orderId,
              menuItemId,
              pricePerItemInCents,
              quantity
          })
      });
      const result = await response.json();
      if (result.error) {
          console.log(result.message);
          return false;
      }
      else {
          return true;
      }
  } catch (err) {
      throw err;
  }
}

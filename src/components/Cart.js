// import { useEffect, useState } from 'react'
// import { Link } from "react-router-dom";
// import { fetchMenuItemById, editQuantity, removeFromCart, fetchuserMenuItemByUser, fetchMenuItembyMenuItemId, addOrder } from '../axios-services';

// const Cart = ({ cart, setCart, userInfo, token, setOrderId }) => {
//     const [localCart, setLocalCart] = useState([]);
//     const [menuItems, setmenuItems] = useState([]);
//     let total = 0;

//     function getAllLocalStorage() {

//         let values = [],
//             keys = Object.keys(localStorage),
//             i = keys.length;

//         while (i--) {
//             values.push(localStorage.getItem(keys[i]));
//         }

//         return values;
//     }
//     const getMenuItemInformation = async (menuItemId) => {
//         try {
//             const menuItemInformation = await fetchMenuItemById(menuItemId);
//             return menuItemInformation;
//         } catch (error) {
//             console.log(error)
//             throw error;
//         }
//     };
//     const createOrder = (buyerId, orderPlacedOn, token) => {
//         try {
//             const order = Promise.resolve(addOrder(buyerId, orderPlacedOn, token));
//             order.then(function (result) { return result })

//         } catch (error) {
//             console.log(error)
//             throw error;
//         }
//     };
//     const getMenuItemInformationForCart = () => {
//         cart.map((item) => {
//             const menuItemInformation = Promise.resolve(getMenuItemInformation(item.menuItemId));
//             menuItemInformation.then(function (result) {
//                 setmenuItems((prev) => [result, ...prev]);
//             })
//         })
//     };

//     function loopForSelect(num) {
//         let quantityList = []
//         for (let i = 1; i <= num; i++) {
//             quantityList.push(<option value={i}>{i}</option>)
//         }
//         return quantityList;
//     }
//     async function getuserMenuItems(id) {
//         try {
//             const allmenuItems = await fetchuserMenuItemByUser(id);
//             setCart(allmenuItems);
//         } catch (error) {
//             console.log(error)
//             throw error;
//         }
//     }

//     async function deleteMenuItemFromCart(userMenuItemId, token) {
//         try {
//             await removeFromCart(userMenuItemId, token);
//             const menuItems = await fetchuserMenuItemByUser(userInfo.id);
//             setmenuItems([]);
//             setCart(menuItems);
//             console.log(cart);

//             console.log("done");
//         } catch (error) {
//             console.log(error)
//             throw error;
//         }
//     }

//     async function createOrderFromCart(buyerId, orderPlacedOn, token) {
//         try {
//             const order = await addOrder(buyerId, orderPlacedOn, token);
//             setOrderId(order.id);
//             return order.id;
//         } catch (error) {
//             console.log(error)
//             throw error;
//         }
//     }
    
//     async function editQuantityOfItemInCart(userMenuItemId, quantity, token) {
//         try {
//             await editQuantity(userMenuItemId, quantity, token);
//             const menuItems = await fetchuserMenuItemByUser(userInfo.id);
//             setmenuItems([]);
//             setCart(menuItems);
//         } catch (error) {
//             console.log(error)
//             throw error;
//         }
//     }
//     function arrayRemove(arr, value) { 
    
//         return arr.filter(function(ele){ 
//             return ele != value; 
//         });
//     }

//     useEffect(() => {
//         if (Object.keys(userInfo).length !== 0) {
//             getMenuItemInformationForCart();
//             console.log(cart)
//         }
//     }, [cart[0]])

//     return (
//         <div>
//             {
//                 Object.keys(userInfo).length === 0 ? <div className="card text-center">
//                     <div className='card-body'>
//                         <p className='card-title border border-secondary'>
//                             Sign in to shop
//                         </p>
//                         <Link to={`/menu_items`}><input type="button" className='btn btn-info' value="Back to Shopping"></input></Link>
//                     </div>
//                 </div> :
//                     <div className="card text-center">
//                         {token ?
//                             <>
//                                 {menuItems.map((item) => {
//                                     const userMenuItem = cart.find(menuItem => menuItem.menuItemId === item.id);
//                                     userMenuItem ? total += (item.priceInCents * userMenuItem.quantity) : null;
//                                     return <div className="card text-center d-flex justify-content-between">
//                                         <img src={item.imageURL} className="card-img-top rounded mx-auto d-block" style={{ width: 100, height: 100 }} alt={item.name}></img>
//                                         <h5 className="card-title">{item.name}</h5>
//                                         {/* <div className="mb-3"> */}
//                                         <div className="mb-3">
//                                             <input className="btn btn-primary" type="button" value="Delete" onClick={() => {
//                                                 const userMenuItem = cart.find(menuItem => menuItem.menuItemId === item.id);
//                                                 deleteMenuItemFromCart(userMenuItem.id, token);
//                                             }}></input>
//                                             <div className="input-group mb-3 d-flex justify-content-center">
//                                                 <div className="col-xs-4">
//                                                     <label className="input-group-text" htmlFor="inputGroupSelect01">Quantity </label>
//                                                     <select className="form-select" id="inputGroupSelect01" onChange={(event) => {
//                                                         const userMenuItem = cart.find(menuItem => menuItem.menuItemId === item.id);
//                                                         editQuantityOfItemInCart(userMenuItem.id, event.target.value, token);
//                                                         console.log("done");
//                                                     }}>
//                                                         <option value="" disabled selected>{userMenuItem.quantity}</option>
//                                                         {loopForSelect(item.inventoryQuantity)}
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 })}
//                                 <Link to={`/cart/checkout/`}>
//                                     <h3>total: ${(total / 100).toFixed(2)}</h3>
//                                     <input type='button' value='Checkout' className='btn btn-primary'>
//                                     </input>
//                                 </Link>
//                             </>

//                             : localCart.map((item) => {
//                                 <div className="card text-center">
//                                     <img src={menuItem.url} className="img-fluid rounded-start" alt={menuItem.name}></img>
//                                     <div className="card-body">
//                                         <h5 className="card-title">{menuItem.name}</h5>
//                                         <form onSubmit={() => {
//                                             localStorage.removeItem(`${menuItem.name}`)
//                                         }}>
//                                             <input className="btn btn-primary" type="button" value="Delete"></input>
//                                         </form>
//                                         <form onChange={() => {
//                                             localStorage.setItem(`${menuItem.name}`, { description: menuItem.description, quantity: menuItem.quantity })
//                                         }}>
//                                             <select className="form-select" aria-label="Default select example">
//                                                 {
//                                                     fetchMenuItemById(menuItem.id).quantity.map((num) => {
//                                                         return <option value={num}>{num}</option>
//                                                     }
//                                                     )
//                                                 }
//                                             </select>
//                                         </form>
//                                     </div>
//                                     <form onSubmit={() => {
//                                         const timeStamp = new Date().getTime();
//                                         setOrderId(order.id)
//                                     }}>
//                                         <Link to={`/cart/checkout/${orderId}`}><input type='submit' value='Checkout'></input></Link>
//                                         <Link to={`/cart`}><input type='submit' value='Save Changes'></input></Link>

//                                     </form>
//                                 </div>

//                             })}

//                     </div>

//             }

//         </div >
//     )
// }

// export default Cart;

import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { fetchMenuItemById } from '../axios-services';
import { editQuantity, removeFromCart, fetchUserMenuItemByUser, fetchMenuItembyMenuItemId, addOrder } from "../axios-services";

const Cart = ({ cart, setCart, userInfo, token, setOrderId }) => {
    const [localCart, setLocalCart] = useState([]);
    const [menuItems, setmenuItems] = useState([]);
    let total = 0;

    function getAllLocalStorage() {

        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        return values;
    }
    const getMenuItemInformation = async (menuItemId) => {
        try {
            const menuItemInformation = await fetchMenuItemById(menuItemId);
            return menuItemInformation;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };
    const createOrder = (buyerId, orderPlacedOn, token) => {
        try {
            const order = Promise.resolve(addOrder(buyerId, orderPlacedOn, token));
            order.then(function (result) { return result })

        } catch (error) {
            console.log(error)
            throw error;
        }
    };
    const getMenuItemInformationForCart = () => {
        cart.map((item) => {
            const menuItemInformation = Promise.resolve(getMenuItemInformation(item.menuItemId));
            menuItemInformation.then(function (result) {
                setmenuItems((prev) => [result, ...prev]);
            })
        })
    };

    function loopForSelect(num) {
        let quantityList = []
        for (let i = 1; i <= num; i++) {
            quantityList.push(<option value={i}>{i}</option>)
        }
        return quantityList;
    }
    async function getuserMenuItems(id) {
        try {
            const allmenuItems = await fetchUserMenuItemByUser(id);
            setCart(allmenuItems);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async function deleteMenuItemFromCart(userMenuItemId, token) {
        try {
            await removeFromCart(userMenuItemId, token);
            const menuItems = await fetchUserMenuItemByUser(userInfo.id);
            setmenuItems([]);
            setCart(menuItems);
            console.log(cart);

            console.log("done");
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async function createOrderFromCart(buyerId, orderPlacedOn, token) {
        try {
            const order = await addOrder(buyerId, orderPlacedOn, token);
            setOrderId(order.id);
            return order.id;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    
    async function editQuantityOfItemInCart(userMenuItemId, quantity, token) {
        try {
            await editQuantity(userMenuItemId, quantity, token);
            const menuItems = await fetchUserMenuItemByUser(userInfo.id);
            setmenuItems([]);
            setCart(menuItems);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    function arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

    useEffect(() => {
        if (Object.keys(userInfo).length !== 0) {
            getMenuItemInformationForCart();
            console.log(cart)
        }
    }, [cart[0]])

    return (
        <div>
            {
                Object.keys(userInfo).length === 0 ? <div className="card text-center">
                    <div className='card-body'>
                        <p className='card-title border border-secondary'>
                            Sign in to shop...
                        </p>
                        <Link to={`/menuItems`}><input type="button" className='btn btn-info' value="Back to Shopping"></input></Link>
                    </div>
                </div> :
                    <div className="card text-center">
                        {token ?
                            <>
                                {menuItems.map((item) => {
                                    const userMenuItem = cart.find(menuItem => menuItem.menuItemId === item.id);
                                    userMenuItem ? total += (item.priceInCents * userMenuItem.quantity) : null;
                                    return <div className="card text-center d-flex justify-content-between">
                                        <img src={item.imageURL} className="card-img-top rounded mx-auto d-block" style={{ width: 100, height: 100 }} alt={item.name}></img>
                                        <h5 className="card-title">{item.name}</h5>
                                        {/* <div className="mb-3"> */}
                                        <div className="mb-3">
                                            <input className="btn btn-primary" type="button" value="Delete" onClick={() => {
                                                const userMenuItem = cart.find(menuItem => menuItem.menuItemId === item.id);
                                                deleteMenuItemFromCart(userMenuItem.id, token);
                                            }}></input>
                                            <div className="input-group mb-3 d-flex justify-content-center">
                                                <div className="col-xs-4">
                                                    <label className="input-group-text" for="inputGroupSelect01">Quantity </label>
                                                    <select className="form-select" id="inputGroupSelect01" onChange={(event) => {
                                                        const userMenuItem = cart.find(menuItem => menuItem.menuItemId === item.id);
                                                        editQuantityOfItemInCart(userMenuItem.id, event.target.value, token);
                                                        console.log("done");
                                                    }}>
                                                        <option value="" disabled selected>{userMenuItem.quantity}</option>
                                                        {loopForSelect(item.inventoryQuantity)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                                <Link to={`/cart/checkout/`}>
                                    <h3>total: ${(total / 100).toFixed(2)}</h3>
                                    <input type='button' value='Checkout' className='btn btn-primary'>
                                    </input>
                                </Link>
                            </>

                            : localCart.map((item) => {
                                <div className="card text-center">
                                    <img src={menuItem.url} className="img-fluid rounded-start" alt={menuItem.name}></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{menuItem.name}</h5>
                                        <form onSubmit={() => {
                                            localStorage.removeItem(`${menuItem.name}`)
                                        }}>
                                            <input className="btn btn-primary" type="button" value="Delete"></input>
                                        </form>
                                        <form onChange={() => {
                                            localStorage.setItem(`${menuItem.name}`, { description: menuItem.description, quantity: menuItem.quantity })
                                        }}>
                                            <select className="form-select" aria-label="Default select example">
                                                {
                                                    fetchMenuItemById(menuItem.id).quantity.map((num) => {
                                                        return <option value={num}>{num}</option>
                                                    }
                                                    )
                                                }
                                            </select>
                                        </form>
                                    </div>
                                    <form onSubmit={() => {
                                        const timeStamp = new Date().getTime();
                                        setOrderId(order.id)
                                    }}>
                                        <Link to={`/cart/checkout/${orderId}`}><input type='submit' value='Checkout'></input></Link>
                                        <Link to={`/cart`}><input type='submit' value='Save Changes'></input></Link>

                                    </form>
                                </div>

                            })}

                    </div>

            }

        </div >
    )
}

export default Cart;
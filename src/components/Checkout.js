import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createOrderMenuItem, addOrder, addMenuItemToOrder, editOrder, fetchMenuItemById, removeFromCart, editMenuItemInventory } from "../axios-services";

const Checkout = ({cart, setCart, token, userInfo, setName, setOrderId}) => {
    const { orderId } = useParams();
    // const [order, setOrder] = useState([]);
    let total = 0;
    const [menuItems, setMenuItems] = useState([])
    let navigate = useNavigate();
    
    const createOrder = async (buyerId, orderPlacedOn, token) => {
        try {
            const order = await addOrder(buyerId, orderPlacedOn, token);
            return order
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getMenuItemInformation = async (menuItemId) => {
        try {
            const menuItemInformation = await fetchMenuItemById(menuItemId);
            return menuItemInformation;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getMenuItemInformationForCart = () => {
        cart.map((item) => {
            const menuItemInformation = Promise.resolve(getMenuItemInformation(item.menuItemId));
            menuItemInformation.then(function (result) {
                setMenuItems((prev) => [result, ...prev]);
            })
        })
        return [];
    };

    function WithoutTime(dateTime) {
        let date = new Date(dateTime.getTime());
        date.setHours(0, 0, 0, 0);
        return date;
    }

    async function submitOrder() {
        let date = new Date();
        date = WithoutTime(date);
        const order = await createOrder(userInfo.id, date, token);
        setOrderId(order.id)
        cart.map(async (item) => {
            const menuItem = await fetchMenuItemById(item.menuItemId);
            const inventory = menuItem.inventoryQuantity - item.quantity;
            await addMenuItemToOrder(item.menuItemId, order.id, menuItem.priceInCents, item.quantity, token);
            await editMenuItemInventory(item.menuItemId, inventory, token);
        });
        navigate('/cart/order-confirmation');
    }

    useEffect(() => {
        if (Object.keys(userInfo).length !== 0) {
                getMenuItemInformationForCart();
        }
    }, [cart])
    menuItems.map((item)=>{
        const userMenuItem = cart.find(menuItem => menuItem.menuItemId === item.id);
        total += (item.priceInCents * userMenuItem.quantity)
    })
    return (
        <form >
            <div className="card">
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Email</span>
                        <input type="text" className="form-control" defaultValue={userInfo.email} aria-label="email" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" >First name</span>
                        <input type="text" className="form-control" placeholder="first name" aria-label="first name" aria-describedby="basic-addon1" onChange={(event) => setName(event.target.value)}></input>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Last name</span>
                        <input type="text" className="form-control" placeholder="last name" aria-label="last name" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Address</span>
                        <input type="text" className="form-control" defaultValue={userInfo.address} aria-label="address" aria-describedby="basic-addon1"></input>
                    </div>
                    <h2>total: ${(total / 100).toFixed(2)}</h2>
                </div>
            </div>
            <input type='button' value='Submit Order' className='btn btn-primary' onClick={() => submitOrder()}></input>
            <Link to={`/cart`}><input type='button' value='Back To Cart' className='btn btn-secondary m-2'></input></Link>
        </form>
    )
}

export default Checkout
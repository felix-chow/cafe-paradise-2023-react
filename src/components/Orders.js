import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { editOrder, fetchAllOrders, fetchOrdersByBuyerId } from "../axios-services";

const Orders = ({ userInfo, token }) => {
    const [orders, setOrders] = useState([]);
    const [refetch, setRefetch] = useState('')

    useEffect(() => {
        async function fetchOrders() {
            try {

                if (Object.keys(userInfo).length > 0 && userInfo.isAdmin) {
                    const results = await fetchAllOrders(token);
                    if (results) {
                        //format date into human readable format
                        results.forEach(order => {
                            const date = new Date(order.orderPlacedOn);
                            const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
                            return order.orderPlacedOn = formattedDate;
                        })
                        setOrders(results);
                    }
                }
                else if (Object.keys(userInfo).length > 0) {
                    const results = await fetchOrdersByBuyerId(userInfo.id, token);
                    if (results) {
                        //format date into human readable format
                        results.forEach(order => {
                            const date = new Date(order.orderPlacedOn);
                            const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
                            return order.orderPlacedOn = formattedDate;
                        })
                        setOrders(results);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchOrders();
    }, [userInfo, refetch])

    async function orderStatusUpdate(orderId, orderStatus) {
        await editOrder(orderId, orderStatus, token);
        setRefetch(orderId + " " + orderStatus);
    }

    if (Object.keys(userInfo).length === 0) {
        return (
            <div>
                <h1>Loading Page</h1>
            </div>
        )
    } else {
        return (
            <div>
                {orders.length > 0 ?
                    orders.map(order => {
                        let total = 0;
                        return (
                            <div className="card mt-3" key={'O' + order.id}>
                                <div className='card-body'>
                                    <h3>Order {order.id}</h3>
                                    {order.menuItems.map(menuItem => {
                                        { total += menuItem.pricePerItemInCents * menuItem.quantity }
                                        return (
                                            <div key={'P' + menuItem.id}>
                                                <h3><Link to={`/menuItems/${menuItem.id}`}>{menuItem.name}</Link></h3>
                                                <p className='description'>Price: ${(menuItem.pricePerItemInCents / 100).toFixed(2)}</p>
                                                <p className='description'>Quantity: {menuItem.quantity}</p>
                                            </div>
                                        )
                                    })}
                                    <h5>Total: ${(total / 100).toFixed(2)}</h5>
                                    <p>Order Placed: {order.orderPlacedOn}</p>
                                    <p>Order Status: {order.status}</p>
                                    {userInfo.isAdmin && order.status !== 'Cancelled' && order.status !== 'Completed' && (
                                        <>
                                            {order.status === 'Created' ?
                                                <button className="btn btn-outline-primary" onClick={() => orderStatusUpdate(order.id, 'Processing')}>Process Order</button>
                                                :
                                                <button className="btn btn-outline-primary" onClick={() => orderStatusUpdate(order.id, 'Completed')}>Complete Order</button>
                                            }
                                            <button className="btn btn-outline-danger" onClick={() => orderStatusUpdate(order.id, 'Cancelled')}>Cancel Order</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    }) : (
                        <p className="card-text">No orders yet</p>
                    )
                }
            </div>
        )
    }
}

export default Orders;
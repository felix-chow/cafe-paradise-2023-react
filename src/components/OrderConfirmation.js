import { Link } from "react-router-dom";
import { removeFromCart } from "../axios-services";

const OrderConfirmation = ({ name, orderId, cart, setCart, token }) => {
    cart.map((menuItem) => {
        removeFromCart(menuItem.id, token);
        setCart([]);
    });
    

    return <div class="position-absolute top-50 start-50 translate-middle" style={{fontSize:20}}>Thank you for your order, {name}!<br></br>Order Number: {orderId}<br></br><Link to="/profile"><input type='button' value='View Your Order History' className='btn btn-primary'></input></Link></div>
}

export default OrderConfirmation;
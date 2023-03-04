import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart, deleteMenuItem, fetchMenuItemById } from "../axios-services";
import UpdateMenuItemForm from "./UpdateMenuItemForm.js";

const MenuItem = ({ userInfo, cart, setCart, itemCount, setItemCount, token }) => {
    // const [isAddMode, setIsAddMode] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [menuItem, setMenuItem] = useState({});
    const { menuItemId } = useParams();
    let navigate = useNavigate();
    let quantity = 1;

    useEffect(() => {
        const getmenuItem = async () => {
            try {
                const singlemenuItem = await fetchMenuItemById(menuItemId);
                singlemenuItem.priceInCents = singlemenuItem.priceInCents / 100;
                setMenuItem(singlemenuItem);
            } catch (error) {
                console.log(error)
                throw error;
            }
        };
        getmenuItem();
    }, [menuItemId])

    const handleClick = async (menuItemId) => {
        const itemToAdd = await addToCart(userInfo.id, menuItemId, 1, token);
        setCart((prev) => [itemToAdd, ...prev]);
        setItemCount(itemCount + 1);
    }

    async function deleteHelper(menuItemId) {
        const deleteSuccess = await deleteMenuItem(menuItemId, token);
        if (deleteSuccess) {
            navigate('/menu_items');
        }
    }

    if (Object.keys(menuItem).length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <div className="container">
                <div className="card mb-3">
                    <img
                        className="card-img-top rounded mx-auto d-block"
                        style={{ width: 300, height: 300 }}
                        key={menuItem.id}
                        src={menuItem.imageURL}
                        alt={menuItem.name}
                    />
                    <div className="card-body">
                        <h3 className="card-title display-2 text-center">{menuItem.name}</h3>
                        <h5 className="card-text text-center display-6">{menuItem.description}</h5>
                        <p className="card-text text-center">${(menuItem.priceInCents).toFixed(2)}</p>
                        <p className="card-text text-center">{menuItem.inventoryQuantity} remaining in stock</p>

                    </div>
                </div>
                {isEditMode ?
                    <>
                        <UpdateMenuItemForm menuItem={menuItem} setmenuItem={setMenuItem} setIsEditMode={setIsEditMode} token={token} />
                    </>
                    :
                    Object.keys(userInfo).length !== 0 && userInfo.isAdmin ?
                        <>
                            <button type="button" className="btn btn-outline-primary" onClick={() => setIsEditMode(true)}>Edit menu item</button>
                            <button type="button" className="btn btn-outline-danger" onClick={() => deleteHelper(menuItem.id)}>Delete menu item</button>
                        </>
                        :
                        Object.keys(userInfo).length !== 0 && (
                            <>
                                <button type="button" className="btn btn-outline-primary" onClick={() => handleClick(menuItem.id)}>Add to cart</button>
                            </>
                        )}
                {cart.find((cartItem) => cartItem.menuItemId === menuItem.id) ?
                    <div className="alert alert-success" role="alert">
                        <p>In cart</p>
                    </div>
                    : <></>}
                <br></br>
            </div>
        </div>
    )
}

export default MenuItem;
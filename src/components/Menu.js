import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllCategories, fetchAllMenuItems, addToCart } from "../axios-services";
// import AddProduct from "./AddProduct";
// import croppedBG from '../style/assets/croppedBG.png'

const Menu = ({ cart, menuItems, setMenuItems, userInfo, token, setCart, itemCount, setItemCount }) => {

    const [categories, setCategories] = useState([]);
    // const [searchValue, setSearchValue] = useState("");
    const [refetchMenuItems, setRefetchMenuItems] = useState("");

    const handleClick = async (menuItemId) => {
            const itemToAdd = await addToCart(userInfo.id, menuItemId, 1, token);
            setCart((prev) => [itemToAdd, ...prev]);
            setItemCount(itemCount + 1);
    }

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const allMenuItems = await fetchAllMenuItems();
                setMenuItems(allMenuItems);
            } catch (error) {
                console.log(error)
                throw error;
            }
        };
        getMenuItems();
    }, [setRefetchMenuItems])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categories = await fetchAllCategories();
                setCategories(categories);
            } catch (error) {
                console.log(error)
                throw error;
            }
        };
        getCategories();
    }, [])

    return (
        <div
            className="wrapper">
            {/* <img
                src={croppedBG}
                className="img-responsive bg"
                alt="Responsive image" /> */}


            {userInfo.isAdmin && (
                <AddProduct setRefetchProducts={setRefetchMenuItems} token={token} />
            )}

            <div className="container" style={{ margin: 30 }}>
                <h2>Menu</h2>
                <button className="btn btn-outline-primary">
                    <Link to={'/categories'} className="lead">Browse by category</Link>
                </button>
            </div>

            <div className="text-center">
                <div
                    className="card-group">
                    {menuItems.map(menuItem => {
                        return (
                            <div key={menuItem.id} >
                                {menuItems.map(menuItemToDisplay => {
                                    if (menuItemToDisplay.id === menuItem.id) {
                                        return (
                                            <div key={menuItem.id}>
                                                <div
                                                    className="card text-center"
                                                    style={{ margin: 20 }}>
                                                    <img
                                                        className="img-fluid img-thumbnail card-img-top rounded mx-auto d-block mx-auto"
                                                        style={{ width: 500, height: "auto" }}
                                                        // style={{ width: 300, height: 300 }}
                                                        key={menuItem.id}
                                                        src={menuItem.imageURL}
                                                        alt={menuItem.name}
                                                    />
                                                    <div style={{ padding: 10 }}>
                                                        <h4 className="card-title ">{menuItem.name}</h4>
                                                        <p className="card-text">{menuItem.description}</p>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        style={{ margin: 10 }}>
                                                        <Link to={`/menu_items/${menuItem.id}`} className="nav-link">View Item</Link>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        style={{ margin: 10 }}
                                                        onClick={() => handleClick(menuItem.id)}> Add to cart
                                                    </button>
                                                </div>
                                                {
                                                cart.find((cartItem) => cartItem.menuItemId === menuItem.id) ? <div className="alert alert-success" role="alert">
                                                <p>In cart</p>
                                            </div> : <></>}
                                            </div>
                                        )
                                    }
                                })}
                            </div>)
                    })}
                </div>

            </div>
        </div>)
}

export default Menu;
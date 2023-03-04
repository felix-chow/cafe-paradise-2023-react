import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMenuItemsByCategory } from "../axios-services";
// import croppedBG from '../style/assets/croppedBG.png'

const SingleCategory = ({ categories, menuItems }) => {

    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    const { categoryName } = useParams();

    const handleClick = async (e) => {
        e.preventDefault();
        const itemToAdd = await addToCart(userInfo.id, menuItems.id, 1, token);
        setCart((prev) => [itemToAdd, ...prev])
        setItemCount(itemCount + 1);
    }

    useEffect(() => {
        const getMenuItemsByCategory = async () => {
            try {
                const categoryToDisplay = categories.find(category => category.name === categoryName)
                const menuItems = await fetchMenuItemsByCategory(categoryToDisplay.id);
                setFilteredMenuItems(menuItems);

            } catch (error) {
                console.log(error)
                throw error;
            }
        };
        getMenuItemsByCategory();
    }, [])

    return (
        <div className="text-center">
            {/* <img
                src={croppedBG}
                className="img-responsive bg text-center"
                alt="Responsive image" /> */}
            <main className="container mt-5 text-center">
                <div>
                    {categories.map(category => {
                        if (category.name === categoryName)
                            return (
                                <div key={category.id}
                                    className="card mb-3 text-center bg-image">

                                    <img
                                        className=" text-center img-fluid shadow-2-strong"
                                        src={category.imageURL}
                                        // alt={category.name}
                                    />
                                    <div className="card-body">
                                        {/* <h2 className="display-5">{category.name}</h2> */}
                                    </div>
                                </div>)
                    })}

                    <div
                        className="card-group">
                        {filteredMenuItems.map(menuItem => {
                            return (
                                <div key={menuItems.id} >
                                    {menuItems.map(menuItemToDisplay => {
                                        if (menuItemToDisplay.id === menuItem.id) {
                                            return (
                                                <div key={menuItem.id}>
                                                    <div
                                                        className="card"
                                                        style={{ margin: 10 }}>
                                                        <img
                                                            className="card-img-top rounded mx-auto d-block m-4"
                                                            style={{ width: 300, height: 300 }}
                                                            key={menuItem.id}
                                                            src={menuItem.imageURL}
                                                            alt={menuItem.name}
                                                        />
                                                        <div>
                                                            <h5 className="card-title">{menuItem.name}</h5>
                                                            <p className="card-text">{menuItem.description}</p>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            style={{ margin: 10 }}>
                                                            <Link to={`/menu_items/${menuItem.id}`} className="nav-link">View menu item</Link>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            style={{ margin: 10 }}
                                                            onClick={() => handleClick(menuItem.id)}> Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>)
                        })}

                    </div>
                </div>
            </main>
        </div>
    )
}

export default SingleCategory;
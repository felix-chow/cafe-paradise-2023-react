import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ token, setToken, setUserInfo, userInfo, setCart, menuItems, setCategories }) => {

    //optional - for searchbar:
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const logOut = () => {
        setToken("");
        setCart([]);
        setUserInfo({});
        navigate("/");
    }

    const handleClick = (e) => {
        try {
            const categoryName = e.target
            setCategories(categoryName);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    //optional - for searchbar:
    // const productMatches = (product) => {
    //     const textToCheck = (
    //         product.name + product.description
    //     ).toLowerCase();
    //     return textToCheck.includes(searchValue.toLowerCase());
    // };

    // const filteredMenuItems = menuItems.filter((product) => {
    //     return product ? productMatches(product) : false;
    // });

    return (
        <>
            {/* HOME BUTTON */}
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#FAF3EC"}}>
                <h1 className="navbar-brand m-2"
                    href="#">
                    <Link className="nav-link" to="/">
                        Cafe Paradise
                    </Link>
                </h1>

                {/* HAMBURGER MENU*/}
                <button
                    className="navbar-toggler m-2"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                {/* NAV BAR */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">

                        <Link to="/menu_items" className="nav-link m-3">Menu</Link>

                        {/* ACCOUNT DROPDOWN */}
                        <li className="nav-item dropdown m-2">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                style={{ fontSize: 16, margin: 10 }}
                                fill="currentColor">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

                                {/* LOGGED-IN/ADMIN/GUEST USER VIEW */}
                                {token && !userInfo.isAdmin ? (
                                    <>
                                        <Link to="/profile" className="nav-link dropdown-item p-2">My Profile</Link>
                                        <Link className="nav-link dropdown-item p-2" to="/cart/checkout/:orderId">Checkout</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/" className="nav-link dropdown-item p-2" onClick={logOut}>Log out</Link>
                                    </>

                                ) :
                                    userInfo.isAdmin ? (
                                        <>
                                            <Link className="nav-link dropdown-item p-2" to="/users/list">Users</Link>
                                            <Link to="/profile" className="nav-link dropdown-item p-2">Orders</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/" className="nav-link dropdown-item p-2" onClick={logOut}>Log out</Link>
                                        </>
                                    ) :

                                        (
                                            <>
                                                <Link to="/users/login" className="nav-link dropdown-item p-2">Log in</Link>
                                                <Link to="/users/signup" className="nav-link dropdown-item p-2"> Sign Up</Link>
                                            </>
                                        )}


                            </div>
                        </li>

                        {/* CART DROPDOWN */}
                        <li className="nav-item m-2">
                            <div>
                                <Link className="nav-link" to="/cart"
                                    // href="#" 
                                    // id="navbarDropdown" 
                                    // role="button" 
                                    // data-toggle="dropdown" 
                                    // aria-haspopup="true" 
                                    // aria-expanded="false" 
                                    style={{ fontSize: 16, margin: 10 }}
                                    fill="currentColor">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                </Link>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav >
        </>
    )
}
export default Navigation
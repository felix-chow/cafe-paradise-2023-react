import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { login, register, fetchUserMenuItemByUser } from "../axios-services";

const AccountForm = ({ setToken, cart, setCart, userInfo }) => {
    const navigate = useNavigate();
    const { action } = useParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');


    async function getUserMenuItems(id) {
        try {
            const allMenuItems = await fetchUserMenuItemByUser(id);
            return allMenuItems;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {token, user} = (action === "login" ? await login(email, password) : await register(email, password, address));
            if (token) {
                setToken(token);
                const menuItems = getUserMenuItems(user.id);
                Promise.resolve(menuItems).then(function (result) {
                    setCart((prev) => [...result, ...prev]);
                    console.log(result)
                });
                navigate('/menu_items');
            } else {
                setError(error)
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="card">
            <div className="container">
                <h1 className="text-center text-dark">{action === 'login' ? 'Log In' : 'Sign Up'}</h1>

                <form onSubmit={handleSubmit}>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                        <input type="email" id="formEmail" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <label className="form-label" htmlFor="form2Example1">Email</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                        <input type="password" id="formPassword" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                    {/* <!-- Address input --> */}
                    {action === 'signup' ? (
                        <>
                            <div className="form-outline mb-4">
                                <input type="address" id="formAddress" className="form-control" value={address} onChange={(event) => setAddress(event.target.value)} />
                                <label className="form-label" htmlFor="form2Example2">Address</label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4">{action === 'login' ? 'Log In' : 'Sign Up'}</button>

                            <div className="text-center">
                                <p>
                                    Already a member?
                                </p>
                                <button className="btn btn-white btn-block mb-4 text-center">
                                    <Link className="text-decoration-none" to="/users/login">Log In</Link>
                                </button>
                            </div>
                        </>

                    ) : (
                        <button type="submit" className="btn btn-primary btn-block mb-4">{action === 'login' ? 'Log In' : 'Sign Up'}</button>
                    )}

                    {/* <!-- Error message --> */}
                    {error &&
                        <div className="alert alert-danger" role="alert">
                            <p>{error}</p>
                        </div>}

                </form>
            </div>
        </div>
    )
}

export default AccountForm;
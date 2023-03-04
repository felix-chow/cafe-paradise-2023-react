import { useState } from "react";
import { editUser } from "../axios-services";

const EditAccountInfoForm = ({ userInfo, setIsEditMode, token, setToken, setUserInfo }) => {
    const [email, setEmail] = useState(userInfo.email);
    const [address, setAddress] = useState(userInfo.address);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await editUser(userInfo.id, email, address, token)
            if (response) {
                setUserInfo(response);
                setIsEditMode(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card p-4 m-4">
            <div>
                <form onSubmit={handleSubmit}>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">Email</label>
                        <input type="email" id="formEmail" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    {/* <!-- Address input --> */}
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">Address</label>
                        <input type="address" id="formAddress" className="form-control" value={address} onChange={(event) => setAddress(event.target.value)} />
                    </div>

                    {/* <!-- Save button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-4 m-2">Save</button>

                    {/* <!-- Cancel button --> */}
                    <button className="btn btn-danger mb-4 m-2" onClick={() => setIsEditMode(false)}>Cancel</button>

                    {/* <!-- Error message --> */}
                    {/* {error &&
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>} */}

                </form>

            </div>
        </div>
    )
}

export default EditAccountInfoForm;
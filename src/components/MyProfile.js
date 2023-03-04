import { useState } from "react";
import Orders from "./Orders";
import EditAccountInfoForm from "./EditAccountInfoForm";

const MyProfile = ({ userInfo, token, setToken, setUserInfo }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <div style={{ margin: 20 }}>

            {!userInfo.isAdmin && (
                <h2 className="m-3">My Profile</h2>
            )}


            {isEditMode ?
                <EditAccountInfoForm userInfo={userInfo} setIsEditMode={setIsEditMode} token={token} setToken={setToken} setUserInfo={setUserInfo} />
                :
                <>
                    <div className="row">
                        {!userInfo.isAdmin ?
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Account Info</h2>
                                        <p className="card-text">Email: {userInfo.email}</p>
                                        <p className="card-text">Address: {userInfo.address}</p>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => setIsEditMode(true)}>Edit Account</button>
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <h2 className="card-title">Order History</h2>
                                        <Orders userInfo={userInfo} token={token} />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">All Orders</h2>
                                    <Orders userInfo={userInfo} token={token} />
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default MyProfile;
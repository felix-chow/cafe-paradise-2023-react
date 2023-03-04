import { Link } from "react-router-dom"
import coffeePic from "../style/assets/moving-steam-coffee.gif"

const Home = ({ userInfo }) => {
    return (
        <main className="container">

            <div className="starter-template" style={{ margin: 30 }}>
                <div className="row">
                    <div className="col" style={{width:"50%"}}>
                        <h1 className="display-6 text-black">Enjoy your coffee with us here<br />at Cafe Paradise</h1>
                        <p>Are you a coffee lover? Do you enjoy the sweet aroma of coffee as much as we do? Here at Cafe Mania, we offer a variety of different coffees, made to satisfy the needs of our customers. We also offer donuts, bagels, and breakfast sandwiches.</p>
                    </div>
                    <div className="col">
                        <img src={coffeePic} className
                            ="img-fluid" style={{ width: 383, height: 278 }} alt="Steaming coffee" />
                    </div>
                </div>

                {console.log(userInfo)}
                {userInfo.email &&
                    <div
                        style={{ margin: 20 }}>
                        <h5 style={{ padding: 15 }} className="text-white"> Welcome, {userInfo.email}! </h5>
                        <button style={{ padding: 15 }} className="btn btn-primary">
                            <Link to="/menu_items" className="nav-link" >Browse our menu</Link>
                        </button>
                    </div>
                }
            </div>
        </main>
    )
}

export default Home;
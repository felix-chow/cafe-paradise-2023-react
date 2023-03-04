import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
// import AddCategory from "./AddCategory";
import { fetchAllCategories } from "../axios-services";
// import croppedBG from '../style/assets/croppedBG.png'

const Categories = ({ categories, setCategories, token, userInfo }) => {

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

        <div>
            <main
                className="container mt-5">
                <div>

                    {userInfo.isAdmin && (
                        <AddCategory token={token} />
                    )}

                    <div style={{ margin: 50 }}>
                        <h2 className="mb-4 card-group">Browse by Category</h2>
                        <div>
                            {categories.map(category => {
                                return (
                                    <div key={category.id}
                                        className="card mb-3 text-center bg-image">

                                        <img
                                            className=" text-center img-fluid shadow-2-strong"
                                            src={category.imageURL}
                                            alt={category.name}
                                        />
                                        <div className="card-body">
                                            <h2 className="display-5">{category.name}</h2>
                                            <Link
                                                href="#"
                                                className="btn btn-secondary"
                                                to={`/categories/${category.name}`}>
                                                Browse all {category.name}
                                            </Link>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>

                </div>
            </main >

        </div >
    )
}

export default Categories;
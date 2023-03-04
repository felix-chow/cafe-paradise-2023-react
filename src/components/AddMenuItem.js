import { useState } from "react"
import { addMenuItem, addMenuItem } from "../axios-services";

const AddMenuItem = ({ setRefetchMenuItems, token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [priceInCents, setPriceInCents] = useState(0);
    const [quantity, setQuantity] = useState(0);

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await addMenuItem(name, description, imageURL, priceInCents, quantity, token);
            if (response) {
                setRefetchMenuItems(name)
                setName("");
                setDescription("");
                setImageURL("");
                setPriceInCents(0);
                setQuantity(0);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div 
            className="ms-5 mb-2"
            style={{margin: 20}}>
            <h2>Add Menu Item</h2>
            <form onSubmit={submitHandler}>
                <div className="row mb-2">
                    <label htmlFor="name" className="col-form-label">Name:</label>
                    <div className="col-sm-5">
                        <input type="text" id="name" className="form-control" value={name} onChange={event => setName(event.target.value)} required></input>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="description" className="col-form-label">Description:</label>
                    <div className="col-sm-5">
                        <textarea id="description" className="form-control" value={description} onChange={event => setDescription(event.target.value)} required></textarea>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="imageURL" className="col-form-label">Image URL:</label>
                    <div className="col-sm-5">
                        <input type="text" id="imageURL" className="form-control" value={imageURL} onChange={event => setImageURL(event.target.value)} required></input>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="price" className="col-form-label">Price in Cents:</label>
                    <div className="col-sm-5">
                        <input type="number" id="price" className="form-control" value={priceInCents} onChange={event => setPriceInCents(event.target.value)} required></input>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="quantity" className="col-form-label">Quantity:</label>
                    <div className="col-sm-5">
                        <input type="number" id="quantity" className="form-control" value={quantity} onChange={event => setQuantity(event.target.value)} required></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">Add Menu Item</button>
            </form>
        </div>
    )
}

export default AddMenuItem;
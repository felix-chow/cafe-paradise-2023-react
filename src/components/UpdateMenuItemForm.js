import { useState } from "react";
import { editMenuItem } from "../axios-services";

const UpdateMenuItemForm = ({ menuItem, setMenuItem, setIsEditMode, token }) => {
    const [name, setName] = useState(menuItem.name);
    const [description, setDescription] = useState(menuItem.description);
    const [imageURL, setImageURL] = useState(menuItem.imageURL);
    const [priceInCents, setPriceInCents] = useState(menuItem.priceInCents);
    const [inventoryQuantity, setInventoryQuantity] = useState(menuItem.inventoryQuantity);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await editMenuItem(menuItem.id, name, description, imageURL, priceInCents, inventoryQuantity, token);
            
            if (response) {
                const menuItemId = menuItem.id
                setMenuItem({menuItemId, name, description, imageURL, priceInCents, inventoryQuantity})
                setIsEditMode(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
        return <>
            <h1>Update Menu Item</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="col-form-label">Name:</label>
                <div className="col-sm-5">
                    <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control" required/>
                </div>

                <label htmlFor="description" className="col-form-label">Description:</label>
                <div className="col-sm-5">
                    <textarea value={description} onChange={e => setDescription(e.target.value)} id="description" className="form-control" required/>
                </div>

                <label htmlFor="imageURL" className="col-form-label">Image URL:</label>
                <div className="col-sm-5">
                    <input value={imageURL} onChange={e => setImageURL(e.target.value)} id="imageURL" type="text" className="form-control" required/>
                </div>

                <label htmlFor="price" className="col-form-label">Price In Cents:</label>
                <div className="col-sm-5">
                    <input value={priceInCents} onChange={e => setPriceInCents(e.target.valueAsNumber)} id="price" type="number" className="form-control" required/>
                </div>

                <label htmlFor="inventoryQuantity" className="col-form-label">Inventory Quantity:</label>
                <div className="col-sm-5">
                    <input value={inventoryQuantity} onChange={e => setInventoryQuantity(e.target.valueAsNumber)} id="inventoryQuantity" type="number" className="form-control" required/>
                </div>

                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                <button className="btn btn-danger mt-4" onClick={() => setIsEditMode(false)}>Cancel</button>
            </form>
        </>
}

export default UpdateMenuItemForm;
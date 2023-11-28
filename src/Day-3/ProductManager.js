

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '', category: '', unitprice: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    const apiUrl = 'http://localhost:3000/products'; 
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get(apiUrl);
        setProducts(response);
    };

    const handleInputChange = (e, product) => {
        const { name, value } = e.target;
        console.log(value)
        if (product) {
            setEditingProduct({ ...editingProduct, [name]: value });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const addProduct = async () => {
        await axios.post(apiUrl, newProduct);
        setNewProduct({ name: '', quantity: '', category: '', unitprice: '' });
        fetchProducts();
    };

    const startEditing = (product) => {
        setEditingProduct(product);
    };

    const cancelEditing = () => {
        setEditingProduct(null);
    };

    const saveProduct = async () => {
        await axios.put(`${apiUrl}/${editingProduct.id}`, editingProduct);
        setEditingProduct(null);
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`${apiUrl}/${id}`);
        fetchProducts();
    };

    return (
        <div>
            <h2>Product Manager</h2>
            {/* Display products */}
            {products.map(product => (
                <div key={product.id}>
                    {editingProduct && editingProduct.id === product.id ? (
                        <div>
                            <input type="text" name="name" value={editingProduct.name} onChange={(e) => handleInputChange(e, true)} />
                            <input type="number" name="quantity" value={editingProduct.quantity} onChange={(e) => handleInputChange(e, true)} />
                            <input type="text" name="category" value={editingProduct.category} onChange={(e) => handleInputChange(e, true)} />
                            <input type="number" name="unitprice" value={editingProduct.unitprice} onChange={(e) => handleInputChange(e, true)} />
                            <button onClick={saveProduct}>Save</button>
                            <button onClick={cancelEditing}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <span>{product.name} - {product.quantity} - {product.category} - ${product.unitprice}</span>
                            <button onClick={() => startEditing(product)}>Edit</button>
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}

            {/* Add new product */}
            <div>
                <input type="text" placeholder="Name" name="name" value={newProduct.name} onChange={handleInputChange} />
                <input type="number" placeholder="Quantity" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
                <input type="text" placeholder="Category" name="category" value={newProduct.category} onChange={handleInputChange} />
                <input type="number" placeholder="Unit Price" name="unitprice" value={newProduct.unitprice} onChange={handleInputChange} />
                <button onClick={addProduct}>Add Product</button>
            </div>
        </div>
    );
};

export default ProductManager;

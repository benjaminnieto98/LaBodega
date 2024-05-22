import React, { useState, useEffect } from 'react';
import { firebaseServices } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, getStorage, deleteObject } from 'firebase/storage';
import './styles.css';

function Admin() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        measure: '',
        price: '',
        stock: '',
        image: null,
    });
    const [file, setFile] = useState("");
    const [showAddForm, setShowAddForm] = useState(true); 
    const [existingCategories, setExistingCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);
    const [editProductData, setEditProductData] = useState({
        name: '',
        category: '',
        measure: '',
        price: '',
        stock: '',
        newImage: null,
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        const uploadFile = async () => {
            try {
                if (!file) {
                    return;
                }
                const storage = getStorage();
                const name = new Date().getTime() + file.name;
                const storageRef = ref(storage, 'product-images/' + name);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                );
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        };
        uploadFile();
    }, [file]);

    const fetchProducts = async () => {
        try {
            const productsData = await firebaseServices.getProducts();
            if (!productsData.error) {
                setProducts(productsData);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const categoriesData = await firebaseServices.getCategories();
            if (!categoriesData.error) {
                setCategories(categoriesData);
                const existingCategoryNames = categoriesData.map(category => category.name);
                setExistingCategories(existingCategoryNames);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAdd = async (e) => {
    e.preventDefault();
    try {
        const storage = getStorage();
        const name = file.name;
        const storageRef = ref(storage, `product-images/${newProduct.name}/${name}`);
        const metadata = {
            contentType: 'image/jpeg',
        };
        await uploadBytes(storageRef, file, metadata);
        const imageUrl = await getDownloadURL(storageRef);

        const productData = {
            ...newProduct,
            image: imageUrl,
        };
        productData.category = categories.find(category => category.name === newProduct.category).name; 
        const product = await firebaseServices.createProduct(productData);
        if (!product.error) {
            setNewProduct({
                name: '',
                category: '',
                measure: '',
                price: '',
                stock: '',
                image: null,
            });
            setFile("");
            setProducts((prevProducts) => [...prevProducts, product]);
            fetchProducts();
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

    const addCategory = async (e) => {
        e.preventDefault();
        try {
            const category = await firebaseServices.createCategory({ name: newCategory });
            if (!category.error) {
                setNewCategory('');
                fetchCategories();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const product = await firebaseServices.getProductById(productId);
            if (product.image) {
                const storage = getStorage();
                const storageRef = ref(storage, product.image);
                const exists = await getDownloadURL(storageRef)
                    .then(() => true)
                    .catch(() => false);
                if (exists) {
                    await deleteObject(storageRef);
                }
            }
            await firebaseServices.deleteProduct(productId);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCategory = async (categoryId) => {
        const result = await firebaseServices.deleteCategory(categoryId);
        if (result.success) {
            fetchCategories();
        }
    };

    const editProduct = async (productId) => {
        try {
            const product = await firebaseServices.getProductById(productId);
            setEditingProductId(productId);
            setEditProductData({
                name: product.name,
                category: product.category,
                measure: product.measure,
                price: product.price,
                stock: product.stock,
            });
            setShowAddForm(false); 
        } catch (error) {
            console.error(error);
        }
    };
    
    const saveEditProduct = async (e) => {
        e.preventDefault();
        try {
            const updatedProductData = { ...editProductData };
            const productId = editingProductId;
            if (editProductData.newImage) {
                const storage = getStorage();
                const storageRef = ref(storage, `product-images/${updatedProductData.name}/${editProductData.newImage.name}`);
                await uploadBytes(storageRef, editProductData.newImage);
                updatedProductData.image = await getDownloadURL(storageRef);
            }
            await firebaseServices.editProduct(productId, updatedProductData);
            await fetchProducts();
            setShowAddForm(true);
            setEditingProductId(null);
            setEditProductData({
                name: '',
                category: '',
                measure: '',
                price: '',
                stock: '',
                newImage: null,
            });
    
            console.log("Producto actualizado con éxito.");
        } catch (error) {
            console.error("Error durante la edición de producto:", error);
        }
    };
    

    const cancelEditProduct = () => {
        setEditingProductId(null);
        setEditProductData({
            name: '',
            category: '',
            measure: '',
            price: '',
            stock: '',
            newImage: null,
        });
    };

    const handleNewProductImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFile(imageFile);
    };

    const handleEditProductImageChange = (e) => {
        const imageFile = e.target.files[0];
        setEditProductData({ ...editProductData, newImage: imageFile });
    };


    return (
        <div className='AdminContainer'>
            <h1>🔧Administración</h1>
            {editingProductId && (
                <form className='addForm' onSubmit={saveEditProduct}>
                    <h2 className='formTitle'>Editar Producto</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            value={editProductData.name}
                            onChange={e => setEditProductData({ ...editProductData, name: e.target.value })}
                        />
                        <label>Nombre</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={editProductData.measure}
                            onChange={e => setEditProductData({ ...editProductData, measure: e.target.value })}
                        />
                        <label>Medida</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            value={editProductData.price}
                            onChange={e => setEditProductData({ ...editProductData, price: e.target.value })}
                        />
                        <label>Precio</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            value={editProductData.stock}
                            onChange={e => setEditProductData({ ...editProductData, stock: e.target.value })}
                        />
                        <label>Stock</label>
                    </div>
                    <label className="custum-file-upload">
                        <input
                            type="file"
                            id="file"
                            onChange={handleEditProductImageChange}
                        />
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                        </div>
                        <div className="text">
                            {file ? file.name : "Cargar Imagen"}
                        </div>
                    </label>
                    <div className="input-group">
                        <select
                            value={editProductData.category}
                            onChange={e => setEditProductData({ ...editProductData, category: e.target.value })}
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label>Categoria</label>
                    </div>
                    <button className='addButton' type='submit'>Actualizar</button>
                    <button className='cancelButton' onClick={() => { cancelEditProduct(); setShowAddForm(true); }}>Cancelar</button>
                </form>
            )
            }
            {showAddForm &&
                <form className='addForm' onSubmit={handleAdd}>
                    <h2 className='formTitle'>Nuevo Producto</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <label>Nombre</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <label>Precio</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={newProduct.measure}
                            onChange={e => setNewProduct({ ...newProduct, measure: e.target.value })}
                        />
                        <label>Medida (ml)</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            value={newProduct.stock}
                            onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                        />
                        <label>Stock</label>
                    </div>
                    <label className="custum-file-upload">
                        <input
                            type="file"
                            id="file"
                            onChange={handleNewProductImageChange}
                        />
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                        </div>
                        <div className="text">
                            {file ? file.name : "Cargar Imagen"}
                        </div>
                    </label>
                    <div className="input-group">
                        <select
                            value={newProduct.category}
                            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label>Categoria</label>
                    </div>
                    <button className='addButton' type='submit'>Crear</button>
                </form>
            }
            <div className="ProductListContainer">
                <ul className="AdminProductList">
                    {products.map(product => (
                        <li key={product.id} className="AdminProductCard">
                            <div className="ProductImageContainer">
                                <img src={product.image} alt={product.name} className="ProductImage" />
                            </div>
                            <div className="ProductDetails">
                                <h3 className="ProductName">{product.name}</h3>
                                <p className="ProductPrice">${product.price}</p>
                                <p className="ProductDescription">{product.measure}ml.</p>
                                {/* <p className="ProductStock">Stock: {product.stock}</p> */}
                                <p className="ProductCategory">{product.category}</p>
                                <div className="ProductButtons">
                                    <i className="material-symbols-rounded EditButton" onClick={() => { editProduct(product.id); setShowAddForm(false); }}>edit</i>
                                    <i className="material-symbols-rounded DeleteButton" onClick={() => deleteProduct(product.id)}>delete</i>

                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <form className='addForm' onSubmit={addCategory}>
                <h2 className='formTitle'>Nueva Categoria</h2>
                <div className="input-group">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                    />
                    <label>Nombre</label>
                </div>
                <button className='addButton' type='submit'>Crear</button>
            </form>
            <ul className="CategoryList">
                {categories.map(category => (
                    <li key={category.id} className="CategoryItem">
                        <div className="CategoryName">{category.name}</div>
                        <i className="material-symbols-rounded DeleteButton" onClick={() => deleteCategory(category.id)}>delete</i>
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default Admin;
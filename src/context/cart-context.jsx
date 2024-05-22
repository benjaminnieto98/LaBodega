/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { firebaseServices } from "../services/firebase";

const initialState = {
    products: [],
    categories: [],
    cart: [],
    setCart: () => { },
    getItemQuantity: () => { },
    onDecreaseItem: () => { },
    onAddToCart: () => { },
    onRemoveItem: () => { },
    clearCart: () => { },
    total: 0,
}

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await firebaseServices.getProducts();
                if (!productsData.error) {
                    setProducts(productsData);
                    setLoading(false);
                } else {
                    setError("Error fetching products");
                }
            } catch (error) {
                setError("Error fetching products");
            }
        };

        fetchProducts();
    }, []);
    
    const onAddToCart = (id) => {
        const item = products.find((product) => product.id === id);
        if (!item) return; // Si el producto no se encuentra, salir
        const cartItem = cart.find((product) => product.id === id);
        if (cartItem?.quantity === Number(item.stock)) return;
        const updatedCart = cartItem
            ? cart.map((product) =>
                  product.id === id ? { ...product, quantity: product.quantity + 1 } : product
              )
            : [...cart, { ...item, quantity: 1 }];
        setCart(updatedCart);
    };

    const onDecreaseItem = (id) => {
        if (cart?.find((product) => product.id === id)?.quantity === 1) return;
        if (cart?.length > 0 && cart?.find((product) => product.id === id)) {
            setCart((currentCart) => {
                return currentCart.map((product) => {
                    if (product.id === id) {
                        return { ...product, quantity: product.quantity - 1 }
                    } else {
                        return product
                    }
                })
            });
        }
    }

    const onRemoveItem = (id) => {
        setCart((currentCart) => {
            return currentCart.filter((product) => product.id !== id)
        })
    }

    const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)

    const getItemQuantity = (id) => {
        return cart.find((product) => product.id === id)?.quantity || 0;
    }

    const getTotalItemQuantity = () => {
        return cart.reduce((acc, product) => acc + product.quantity, 0)
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                onDecreaseItem,
                onAddToCart,
                onRemoveItem,
                total,
                products,
                categories,
                setCategories,
                setProducts,
                getItemQuantity,
                getTotalItemQuantity,
                clearCart,
            }}
        >
            {!loading && !error ? children : <p>{error || "Cargando..."}</p>}
        </CartContext.Provider>
    );
}
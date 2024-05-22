import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export const firebaseServices = {

    //PRODUCTS

    createProduct: async (product) => {
        try {
            const db = getFirestore();
            const productsCollection = collection(db, 'products');
            const productCreated = await addDoc(productsCollection, product);

            if (product.image) {
                const storage = getStorage();
                const storageRef = ref(storage, 'product-images/' + productCreated.id);
                await uploadBytes(storageRef, product.image);
            }

            return {
                id: productCreated.id
            };
        } catch (error) {
            throw error;
        }
    },
    deleteProduct: async (productId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'products', productId);
            await deleteDoc(docRef);
        } catch (error) {
            throw error;
        }
    },
    editProduct: async (productId, newData) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'products', productId);
            const { newImage, ...updatedData } = newData;
            await updateDoc(docRef, updatedData);

            if (newImage) {
                const storage = getStorage();
                const storageRef = ref(storage, `product-images/${productId}/${newImage.name}`);
                await uploadBytes(storageRef, newImage);
                const imageUrl = await getDownloadURL(storageRef);
                await updateDoc(docRef, { image: imageUrl });
            }

            return { success: true };
        } catch (error) {
            throw error;
        }
    },
    deleteProduct: async (productId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'products', productId);
            await deleteDoc(docRef);
        } catch (error) {
            throw error;
        }
    },
    editProduct: async (productId, newData) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'products', productId);
            const { newImage, ...updatedData } = newData;
            await updateDoc(docRef, updatedData);

            if (newImage) {
                const storage = getStorage();
                const storageRef = ref(storage, `product-images/${productId}/${newImage.name}`);
                await uploadBytes(storageRef, newImage);
                const imageUrl = await getDownloadURL(storageRef);
                await updateDoc(docRef, { image: imageUrl });
            }

            return { success: true };
        } catch (error) {
            throw error;
        }
    },
    getProductById: async (productId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'products', productId);
            const result = await getDoc(docRef);
            return result.data();
        } catch (error) {
            throw error;
        }
    },
    getProducts: async () => {
        try {
            const db = getFirestore();
            const productsCollection = collection(db, 'products');
            const productsSnapshot = await getDocs(productsCollection);

            const products = productsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            return products;
        } catch (error) {
            throw error;
        }
    },


    //CATEGORIES

    getCategories: async () => {
        try {
            const db = getFirestore();
            const categoriesCollection = collection(db, 'categories');
            const categoriesSnapshot = await getDocs(categoriesCollection);

            const categories = categoriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            return categories;
        } catch (error) {
            throw error;
        }
    },
    deleteCategory: async (categoryId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'categories', categoryId);
            await deleteDoc(docRef);
            return { success: true };
        } catch (error) {
            throw error;
        }
    },
    createCategory: async (category) => {
        try {
            const db = getFirestore();
            const categoriesCollection = collection(db, 'categories');
            const categoryCreated = await addDoc(categoriesCollection, category);
            return {
                id: categoryCreated.id
            };
        } catch (error) {
            throw error;
        }
    },
    updateCategory: async (categoryId, data) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'categories', categoryId);
            await updateDoc(docRef, data);
        } catch (error) {
            throw error;
        }
    },
    getCategoryById: async (categoryId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'categories', categoryId);
            const result = await getDoc(docRef);
            return result.data();
        } catch (error) {
            throw error;
        }
    },


    //CART

    createCart: async (cart) => {
        try {
            const db = getFirestore();
            const cartsCollection = collection(db, 'carts');
            const cartCreated = await addDoc(cartsCollection, cart);
            return {
                id: cartCreated.id
            }
        } catch (error) {
            throw error;
        }
    },
    updateCart: async (cartId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'carts', cartId);
            const data = {
                status: 'completed'
            }

            await updateDoc(docRef, data);
        } catch (error) {
            throw error;
        }
    },
    getCartById: async (cartId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'carts', cartId);
            const result = await getDoc(docRef);
            return result.data()
        } catch (error) {
            throw error;
        }
    },


    //ORDERS
    createOrder: async (order) => {
        try {
            const db = getFirestore();
            const ordersCollection = collection(db, 'orders');
            const orderCreated = await addDoc(ordersCollection, order);
            return {
                id: orderCreated.id
            }
        } catch (error) {
            throw error;
        }
    },
    getOrders: async () => {
        try {
            const db = getFirestore();
            const ordersCollection = collection(db, 'orders');
            const ordersSnapshot = await getDocs(ordersCollection);

            const orders = ordersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            return orders;
        } catch (error) {
            throw error;
        }
    },
    getOrderById: async (orderId) => {
        try{
            const db = getFirestore();
            const docRef = doc(db, 'orders', orderId);
            const result = await getDoc(docRef);
            return result.data()
        } catch (error) {
            throw error;
        }
    },
    updateOrderStatus: async (orderId, newStatus) => {
        try {
            const db = getFirestore();
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, { status: newStatus });
            console.log(`Order status updated successfully to ${newStatus}`);
        } catch (error) {
            throw error;
        }
    },

}

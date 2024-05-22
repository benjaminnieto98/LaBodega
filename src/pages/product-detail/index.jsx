// import { useNavigate, useParams } from 'react-router-dom';
// import Details from '../../components/products/details'
// import { API_URLS } from '../../constants';
// import { useFetch } from '../../hooks/useFetch';
// import './styles.css'
// import Loader from '../../components/loader';
// import { useContext } from 'react';
// import { CartContext } from '../../context/cart-context';

// function ProductDetail() {
//     const { productId } = useParams();
//     const navigate = useNavigate();
//     const urlProductDetail = `${API_URLS.PRODUCTS.url}/${productId}`
//     const { onAddToCart } = useContext(CartContext)
//     const { data, loading, error } = useFetch(urlProductDetail, API_URLS.PRODUCTS.config);
//     const history = window.history;
//     return (
//         <div className='productDetailContainer'>
//             <div className='headerDetailContainer'>
//                 {history.length > 2 ? (<button onClick={() => navigate(-1)} className='backButton'><i className="material-symbols-rounded">
//                     arrow_back_ios
//                 </i> </button>) : null}
//                 <h2 className='headerTitleCard'>Product Detail</h2>
//             </div>
//             {loading && (
//                 <div className='loaderContainer'>
//                     <Loader />
//                 </div>
//             )}
//             {error && <p>Something went wrong</p>}
//             <Details {...data} onAddToCart={onAddToCart} />
//         </div>
//     )
// }

// export default ProductDetail

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart-context';
import { firebaseServices } from '../../services/firebase';
import Loader from '../../components/loader';
import Details from '../../components/products/details'; // Importa tu componente de detalles

function ProductDetail() {
    const { productId } = useParams();
    const { onAddToCart } = useContext(CartContext);
    const navigate = useNavigate(); // Asegúrate de importar useNavigate

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            const productData = await firebaseServices.getProductById(productId);
            if (!productData.error) {
                setProduct(productData);
                setLoading(false);
            } else {
                setError('Error fetching product details');
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);

    return (
        <div className='productDetailContainer'>
            <div className='headerDetailContainer'>
                {window.history.length > 2 && (
                    <button onClick={() => navigate(-1)} className='backButton'>
                        <i className="material-symbols-rounded">arrow_back_ios</i>
                    </button>
                )}
                <h2 className='headerTitleCard'>Product Detail</h2>
            </div>
            {loading ? (
                <div className='loaderContainer'>
                    <Loader />
                </div>
            ) : (
                <>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <Details {...product} onAddToCart={onAddToCart} />
                    )}
                </>
            )}
        </div>
    );
}

export default ProductDetail;


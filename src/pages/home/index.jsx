import React, { useEffect, useState, useContext } from 'react';
import './styles.css';
import Input from '../../components/input';
import Card from '../../components/products/card';
import Loader from '../../components/loader';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider';
import { CartContext } from '../../context/cart-context';
import CategoryItem from '../../components/categories/item';
import { firebaseServices } from '../../services/firebase';
import Hero from '../../components/hero';

function Home() {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [productFiltered, setProductFiltered] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todo');
    const [loadingPage, setLoadingPage] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { onAddToCart } = useContext(CartContext);

    const filterBySearch = (query) => {
        if (selectedCategory && query.length === 0) {
            onFilter(selectedCategory);
            return;
        }
        let updateProductList = query.length === 0 ? [...products] : [...products];

        updateProductList = updateProductList.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });

        setProductFiltered(updateProductList);
    };

    const onChange = (event) => {
        const value = event.target.value;
        filterBySearch(value);
    }

    const onFocus = (event) => {
        const value = event.target.value;
        filterBySearch(value);
        setActive(true);
    }

    const onBlur = () => {
        setActive(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await firebaseServices.getProducts();
                const categoriesData = await firebaseServices.getCategories();
    
                if (!productsData.error && !categoriesData.error) {
                    setProducts(productsData);
                    setCategories(categoriesData);
                } else {
                    setProducts('Error fetching products');
                    setCategories('Error fetching categories');
                }
                setLoadingPage(false);
            } catch (error) {
                setProducts('Error fetching products');
                setCategories('Error fetching categories');
                setLoadingPage(false);
            }
        };
    
        fetchData();
    }, []);

    const onShowDetails = (id) => {
        navigate(`/products/${id}`);
    };

    const onFilter = (name) => {
        setIsFiltered(true);
        const productsByCategory = products.filter((product) => product.category === name);
        setProductFiltered(productsByCategory);
        setSelectedCategory(name);
    }

    return (
        <div>
            {loadingPage ? (
                <div className='loaderContainer'>
                    <Loader />
                </div>
            ) : (
                <>
                    <div className='contentContainer'>
                        <h1 className='title'>Bienvenido a La Bodega🍻</h1>
                        <h2 className='subtitle'>¡Encontrá tus bebidas favoritas!</h2>
                        <Hero />
                        <div className='filterContainer'>
                            <Input
                                placeholder='Buscar...'
                                id='task'
                                required={true}
                                name='Buscar'
                                label='Buscar'
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                active={active}
                            />
                        </div>
                        <div className='categoriesContainer'>
                            <Slider>
                                <CategoryItem name="Todo" onSelectCategory={() => setIsFiltered(false)} type='button' />
                                {categories.map((category) => (
                                    <CategoryItem key={category.id} name={category.name} onSelectCategory={() => onFilter(category.name)} type='button' />
                                ))}
                            </Slider>
                        </div>

                        <h3>Bebidas Destacadas🔥</h3>
                        <div className='cardContainer'>
                            {isFiltered
                                ? productFiltered.map((product) => (
                                    <Card key={product.id} {...product} onShowDetails={onShowDetails} onAddToCart={onAddToCart} />
                                ))
                                : products.map((product) => (
                                    <Card key={product.id} {...product} onShowDetails={onShowDetails} onAddToCart={onAddToCart} />
                                ))}
                            {isFiltered && productFiltered.length === 0 && <h2>No se encontraron bebidas...</h2>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;

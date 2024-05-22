import { useContext, useEffect } from 'react'
import Input from '../../components/input'
import './styles.css'
import { useForm } from '../../hooks/useForm'
import { CartContext } from '../../context/cart-context'
import { firebaseServices } from '../../services/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '../../hooks/useQuery'
import CartItem from '../../components/cart/item'
import Total from '../../components/cart/total'


const initialState = {
    name: { value: '', error: '', hasError: true, active: false, name: 'name' },
    // surname: { value: '', error: '', hasError: true, active: false, name: 'surname' },
    // document: { value: '', error: '', hasError: true, active: false, name: 'document' },
    email: { value: '', error: '', hasError: true, active: false, name: 'email' },
    phone: { value: '', error: '', hasError: true, active: false, name: 'phone' },
    address: { value: '', error: '', hasError: true, active: false, name: 'address' },
    // postalCode: { value: '', error: '', hasError: true, active: false, name: 'postalCode' },
    isFormValid: false,
}

function Checkout() {
    const {cart, total, setCart, clearCart, onAddToCart, onDecreaseItem, onRemoveItem, getTotalItemQuantity} = useContext(CartContext);
    const [formState, inputHandler, inputFocus, inputBlur, clearInputs] = useForm(initialState)
    const { state } = useLocation();
    const navigate = useNavigate();
    let query = useQuery();
    
    useEffect(() => {
        const cartId = query.get("cartId") 
        
        if(query.get("cartId")) {
            const getCart = async () => {
                const cart = await firebaseServices.getCartById(cartId)
                return cart
            }
            getCart()
                .then((cart) => {
                    setCart(cart.items)
                })
                .catch((error) => {
                    console.log({error})
                })
        }

    }, [query])

    const onChange = (event) => {
        const { name, value } = event.target
        inputHandler({ name, value })
    }

    const onFocus = ({ name }) => {
        inputFocus({ name })
    }

    const onBlur = ({ name }) => {
        inputBlur({ name })
    }

    const onHandlerOrder = async () => {
        const newOrder = {
            buyer: {
                name: formState.name.value,
                email: formState.email.value,
                phone: formState.phone.value,
                address: formState.address.value,
            },
            createdAt: new Date(),
            items: cart,
            payment: {
                method: 'EFECTIVO',
            },
            shipping: {
                type: 'DELIVERY'
            },
            total: total,
            status: 'Pendiente', 
        }
    
        const orderId = await firebaseServices.createOrder(newOrder);
        await firebaseServices.updateCart(state.cartId)

        return {
            orderId,
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const { orderId } = await onHandlerOrder();
        clearInputs({ formState })
        navigate('/success-order', { state: { orderId: orderId.id } })
        clearCart();
    }

    return (
        <div className="checkoutContainer">
            <div className='checkoutDetailContainer'>
                <div className='checkoutFormContainer'>
                    <form onSubmit={onSubmit} className="checkoutForm">
                        <h1 className='checkoutTitle'>🚀¡Ya casi terminamos!</h1>
                        <div className="checkoutFormContent">
                            <div className="checkoutFormInputGroup">
                                <Input
                                    placeholder='Nombre y Apellido'
                                    id='name'
                                    name='name'
                                    required={true}
                                    label='Nombre y Apellido'
                                    onChange={onChange}
                                    onFocus={(e) => onFocus({ e, name: 'name' })}
                                    onBlur={(e) => onBlur({ e, name: 'name' })}
                                    active={formState.name.active}
                                    error={formState.name.error}
                                    hasError={formState.name.hasError}
                                    maxLength={40}
                                />
                            </div>
                            {/* <div className="checkoutFormInputGroup">
                                <Input
                                    placeholder='surname'
                                    id='surname'
                                    name='surname'
                                    required={true}
                                    label='Surname'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'surname' })}
                                    onBlur={() => onBlur({ name: 'surname' })}
                                    active={formState.surname.active}
                                    error={formState.surname.error}
                                    hasError={formState.surname.hasError}
                                    maxLength={40}
                                />
                            </div> */}
                            {/* <div className="checkoutFormInputGroup">
                                <Input
                                    placeholder='document'
                                    id='document'
                                    name='document'
                                    required={true}
                                    label='Document'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'document' })}
                                    onBlur={() => onBlur({ name: 'document' })}
                                    active={formState.document.active}
                                    error={formState.document.error}
                                    hasError={formState.document.hasError}
                                    maxLength={15}
                                />
                            </div> */}
                            <div className="checkoutFormInputGroup">
                                <Input
                                    placeholder='Email'
                                    id='email'
                                    name='email'
                                    required={true}
                                    label='Email'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'email' })}
                                    onBlur={() => onBlur({ name: 'email' })}
                                    active={formState.email.active}
                                    error={formState.email.error}
                                    hasError={formState.email.hasError}
                                    maxLength={40}
                                />
                            </div>
                            <div className="checkoutFormInputGroup">
                                <Input
                                    placeholder='Teléfono'
                                    id='phone'
                                    name='phone'
                                    required={true}
                                    label='Teléfono'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'phone' })}
                                    onBlur={() => onBlur({ name: 'phone' })}
                                    active={formState.phone.active}
                                    error={formState.phone.error}
                                    hasError={formState.phone.hasError}
                                    maxLength={15}
                                />
                            </div>
                            <div className="checkoutFormInputGroup">
                                <Input
                                    placeholder='Dirección'
                                    id='address'
                                    name='address'
                                    required={true}
                                    label='Dirección'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'address' })}
                                    onBlur={() => onBlur({ name: 'address' })}
                                    active={formState.address.active}
                                    error={formState.address.error}
                                    hasError={formState.address.hasError}
                                    maxLength={80}
                                />
                            </div>
                            {/* <div className="checkoutFormInputGroup">
                                <Input
                                    placeholder='postal code'
                                    id='postalCode'
                                    name='postalCode'
                                    required={true}
                                    label='Postal Code'
                                    onChange={onChange}
                                    onFocus={() => onFocus({ name: 'postalCode' })}
                                    onBlur={() => onBlur({ name: 'postalCode' })}
                                    active={formState.postalCode.active}
                                    error={formState.postalCode.error}
                                    hasError={formState.postalCode.hasError}
                                    maxLength={10}
                                />
                            </div> */}
                        </div>
                        <button disabled={!formState.isFormValid} type='submit' className='buttonCheckout'>Confirmar</button>
                    </form>
                </div>
                {/* {cart?.length > 0 ? (
                    <div className='checkoutCartContainer'>
                        <h1 className='checkoutTitle'>Cart Details</h1>
                        {
                            cart.map((product) => (
                                <CartItem key={product.id}{...product} onAddToCart={onAddToCart} onDecreaseItem={onDecreaseItem} onRemoveItem={onRemoveItem} />
                            ))
                        }
                        <Total total={total} totalItemQuantity={getTotalItemQuantity()} />
                    </div>
                ) : null} */}
            </div>
        </div>
    )
}

export default Checkout
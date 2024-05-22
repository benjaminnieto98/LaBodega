import React, { useState, useEffect } from 'react';
import './styles.css';
import { firebaseServices } from '../../services/firebase';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const ordersData = await firebaseServices.getOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await firebaseServices.updateOrderStatus(orderId, newStatus);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating order status: ", error);
        }
    };

    // Ordenar las órdenes por fecha de creación (más recientes primero)
    const sortedOrders = orders.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

    // Separar órdenes completadas y pendientes
    const pendingOrders = sortedOrders.filter(order => order.status === 'Pendiente');
    const completedOrders = sortedOrders.filter(order => order.status === 'Completado');

    // Unir las listas, primero las pendientes y luego las completadas
    const orderedOrders = [...pendingOrders, ...completedOrders];

    return (
        <div className='OrdersContainer'>
            <h1>📋Órdenes</h1>
            <ul className="OrdersList">
                {orderedOrders.map(order => (
                    <li key={order.id} className={`OrderCard ${order.status}`}>
                        <div className="OrderCardBody">
                            <div className="OrderInfo">
                                <h2>Orden #{order.id}</h2>
                                <p>Total: <span className="bold">${order.total}</span></p>
                                <p>Cliente: <span className="bold">{order.buyer.name}</span></p>
                                <p>Dirección: <span className="bold">{order.buyer.address}</span></p>
                                <p>Teléfono: <span className="bold">{order.buyer.phone}</span></p>
                                <p>Fecha: <span className="bold">{order.createdAt.toDate().toLocaleString()}</span></p>
                            </div>
                            <div className="ProductList">
                                <h2>Productos</h2>
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.id} className="ProductItem">
                                            <p>{item.name} - {item.measure}ml.</p>
                                            <p><span className="bold">${item.price}</span></p>
                                            <p>Cantidad: <span className="bold">{item.quantity}</span></p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="StatusSelector">
                                <select
                                    value={order.status}
                                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                                    className={order.status === 'Completado' ? 'Completed' : ''}
                                >                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Completado">Completado</option>
                                </select>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Orders;

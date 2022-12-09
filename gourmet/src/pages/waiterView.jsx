import React, { useState, useEffect } from "react";
import { getProductList } from "../utils/petitions.js";
import { Header } from "../components/header";
import { Order } from "../components/ordenPedido";
import { OrderMenu } from "../components/orderMenu.jsx";
import '../styles/waiterView.css'


function WaiterView() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // petición de la lista de productos
        getProductList()
            .then((response) => {
                console.log('nuestra respuesta', response)
                setProducts(response.data)
            })
            .catch((error) => console.log(error))
    }, [])

    console.log('products', products)

    return ( // Maqueta componente Admin view
        <section className="adminView">
            <Header>
                <nav className="navMenu">
                    <ul className="navAMenu">
                        <li><a className="navLink" href="/waiter-orders">Pedidos</a></li>
                        <li><a className="navLink" href="/waiter-delivered">Entregados</a></li>
                        <li><a className="navLink" href="/">Salir</a></li>
                    </ul>
                </nav>
            </Header>

            <OrderMenu
                productsMenu={products}
            />
            <Order />

        </section>

    )
}

export { WaiterView }
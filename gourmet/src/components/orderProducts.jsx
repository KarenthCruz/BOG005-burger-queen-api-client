import React, { useState, useEffect } from "react";
import { postNewOrder } from "../utils/petitions.js";


// Formulario para crear la orden de pedido
function OrderProducts({ shareMenu, setShareMenu }) {

    // Estados para número de orden, nombre de usuario y orden
    const [numOrder, setNumOrder] = useState('');
    const [nameClientOrder, setNameClientOrder] = useState('');
    const [totalAmount, setTotalAmount] = useState(0.00);
    
    useEffect(() => {
        let reduce = shareMenu.reduce((accumulator, current) => accumulator + current.price, 0);
        setTotalAmount(reduce)
    }, [shareMenu])
    
    // Manejadores de eventos para orden y nombre de cliente
    const numOrderHandler = (event) => {
        setNumOrder(event.target.value)
    }
    const nameOrderHandler = (event) => {
        setNameClientOrder(event.target.value)
    }

    // Usando la petición para enviar la nueva orden
    const orderPetition = (event) => {
        event.preventDefault();
        postNewOrder(numOrder, nameClientOrder, shareMenu, 'Pending', new Date())
            .then((response) => {
                setShareMenu([]);
                setNameClientOrder('');
                setNumOrder('')
            })
            .catch((error) => console.log(error))
    }

    // Eliminando los productos
    const deleteHandler = (id) => {
        const productToDelete = shareMenu.filter((productOrder) => productOrder.id !== id)
        setShareMenu(productToDelete)
    }

    return (
        // Estructura del componente
        <section className="orderProdSect">
            <section className="orderProdForm">
                <h2 className="titleOrderProduct">
                    Orden de Pedido
                </h2>

                {/* Formulario de la orden de pedido */}
                <form className="orderForm" onSubmit={orderPetition} >
                    <div className="orderDetailsCont">

                        <label id="textOrder">Número de la orden</label>

                        <input
                            className="orderProductInput"
                            type='text'
                            value={numOrder}
                            onChange={numOrderHandler}
                        />
                        <label id="nameOrder">Nombre del cliente</label>
                        <input
                            className="orderProductInput"
                            type='text'
                            value={nameClientOrder}
                            onChange={nameOrderHandler}
                        />
                    </div>
                    {/* Tabla donde se muestra la orden de productos */}
                    <section className="boxOrderSection">
                        <table className="boxOrder">
                            <thead className="tableOrder">
                                <tr className="rowOrder">
                                    <th className="titleNameOrder">Nombre</th>
                                    <th className="titleCuantOrder">Cantidad</th>
                                    <th className="titlePriceOrder">Precio</th>
                                    <th className="titleDeleteOrder">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="bodyOrder">
                                {/* Total de la orden  */}
                                {shareMenu.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.qty}</td>
                                        <td>{product.price}</td>
                                        <td onClick={() => deleteHandler(product.id)}>Delete</td>

                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        <section className="tableOrderTotal">Total: ${totalAmount}</section>
                    </section>
                    <button type="submit" className="orderAddBtn">
                        Agregar Orden
                    </button>
                    <button className="cancelOrderBtn">
                        Cancelar
                    </button>
                </form>
            </section>
        </section>

    )
}


export { OrderProducts };

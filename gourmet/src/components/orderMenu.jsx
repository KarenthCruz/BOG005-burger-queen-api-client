import React, { useState } from "react";
import { useEffect } from "react";
import { getProductList } from "../utils/petitions.js";

function OrderMenu({ productsMenu, setShareMenu, shareMenu }) {
    // Estados de productos para ver los productos, carga por defecto y filtrado
    const [productsToPrint, setProductsToPrint] = useState(productsMenu);
    const [productsDefaul, setProductsDefaul] = useState(false);
    const [productsState, setProductsState] = useState([]);

    //Filtrando los productos
    const handlefilter = (filter) => {
        const filtered = productsMenu.filter(product => product.type == filter);
        setProductsToPrint(filtered)
        setProductsDefaul(false)
        return filtered
    }

    useEffect(() => {
        // petición de la lista de productos
        getProductList()
            .then((response) => {
                setProductsState(response.data)
            })
            .catch((error) => console.log(error))
        setProductsDefaul(true)
    }, [])


    // Adiciona y aumenta la cantidad del producto en la orden
    const handleIncrementClick = (product) => {
        const stayInOrder = shareMenu.find(
            (productOrder) => productOrder.id === product.id
        );
        if (stayInOrder) {
            setShareMenu(
                shareMenu.map((productMenu) => {
                    if (productMenu.id === product.id) {
                        return { ...productMenu, qty: (productMenu.qty += 1) }
                    } else {
                        return productMenu;
                    }
                })
            );
        } else {
            setShareMenu([...shareMenu, { ...product, qty: 1 }]);
        }
    }

    const completeMenu = productsDefaul ? productsState : productsToPrint;

    return (
        // Estructura del componente que muestra los productos
        <section className="viewMenuOrder">
            <section className="menuBtns">
                {/* Botón que muestra los productos tipo desayuno */}
                <button onClick={() => handlefilter('Desayuno')} className="menuBreakfastBtn">
                    <i className="fa-solid fa-bacon"></i>
                    Desayuno
                </button>
                {/* Botón que muestra los productos tipo Almuerzo */}
                <button className="menuLunchBtn" onClick={() => handlefilter('Almuerzo')}>
                    <i className="fa-solid fa-utensils"></i>
                    Almuerzo
                </button>
                {/* Botón que muestra los productos tipo Bebida */}
                <button className="menuDrinksBtn" onClick={() => handlefilter('Bebidas')}>
                    <i className="fa-solid fa-wine-glass-empty"></i>
                    Bebidas
                </button>
            </section>

            {/* Estructura para mostrar los productos */}
            <section className="menuOrderList">
                {completeMenu.map((product, index) => (
                    <article className="containProductOrder" key={product.id}>
                        <img className="productImageOrder" srcSet={product.image} alt={product.name} />
                        <div className="productTextOrder">
                            <p>{product.name} <span className="productPrice">${product.price}</span></p>
                        </div>

                        <button className="orderMenuBtn" onClick={() => handleIncrementClick(product)}>
                            Agregar
                        </button>
                    </article>
                ))}

            </section>
        </section>

    )
}

export { OrderMenu }
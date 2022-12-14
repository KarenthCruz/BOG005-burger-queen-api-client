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

    const handleAdd = (product, index) => {
        // const nextCounters = shareMenu.map((c, i) => {
        //     if (i === index) {
        //       // Increment the clicked counter
        //       return c + 1;
        //     } else {
        //       // The rest haven't changed
        //       return c;
        //     }
        //   })
        setShareMenu([...shareMenu, { id: product.id, name: product.name, price: product.price, qty: 1 } ]);
    }
    console.log('asdasdasd', shareMenu)
    function handleIncrementClick(index) {
        const nextCounters = counters.map((c, i) => {
          if (i === index) {
            // Increment the clicked counter
            return c + 1;
          } else {
            // The rest haven't changed
            return c;
          }
        });
        setCounters(nextCounters);
      }
    // const handleAdd = (name) => {
    //     if(shareMenu.find(el => el.name === name)){
    //         const pepe = name;
    //         console.log(pepe)
    //         shareMenu.map
    //         setShareMenu([...shareMenu, { name, qty: 1 }]);
    //     } 
    //     console.log('pepe')
    //     setShareMenu([...shareMenu, { name, qty: 1 }]);
    // }

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
                        <img className="productImage" srcSet={product.image} alt={product.name} />
                        <div className="productTextOrder">
                            <p>{product.name} <span className="productPrice">${product.price}</span></p>
                        </div>

                        <button className="orderMenuBtn" onClick={() => handleAdd(product, index) }>
                            Agregar
                        </button>
                    </article>
                ))}

            </section>
        </section>

    )
}

export { OrderMenu }
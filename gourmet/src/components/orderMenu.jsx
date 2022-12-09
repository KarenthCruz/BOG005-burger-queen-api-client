import React, { useState } from "react";

function OrderMenu(props) {
    
    const [productsToPrint, setProductsToPrint] = useState(props.productsMenu); 

    const handlefilter = (filter) => {
        console.log('id', filter)
        const filtered = props.productsMenu.filter(product => product.type == filter);
        setProductsToPrint(filtered)
        console.log(filtered)
        return filtered
    }

    return (
        <section className="viewMenuOrder">
            <section className="menuBtns">
                <button onClick={() => handlefilter('Desayuno')} className="menuBreakfastBtn">
                    <i className="fa-solid fa-bacon"></i>
                    Desayuno
                </button>
                <button className="menuLunchBtn active" onClick={() => handlefilter('Almuerzo')}>
                    <i className="fa-solid fa-utensils"></i>
                    Almuerzo
                </button>
                <button className="menuDrinksBtn" onClick={() => handlefilter('Bebidas')}>
                    <i className="fa-solid fa-wine-glass-empty"></i>
                    Bebidas
                </button>
            </section>

            {/* Sección para mostrar los productos */}
            {productsToPrint.map((product, index) => (
                <article className="containProduct" key={product.id}>
                    <img className="productImage" srcSet={product.image} alt={product.name} />
                    <div className="productText">
                        <p>{product.name} <span className="productPrice">${product.price}</span></p>
                    </div>
                </article>
            ))}
        </section>

    )
}

export { OrderMenu }
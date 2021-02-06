import React, { useState } from 'react'

export const ProductsContext = React.createContext({
    products: [],
    toogleFav: (id) => { }
})

export default props => {

    const [productsList, setProductsList] = useState([
        {
            id: 'p1',
            title: 'Red Scarf',
            description: 'A pretty red scarf.',
            isFavorite: false
        },
        {
            id: 'p2',
            title: 'Blue T-Shirt',
            description: 'A pretty blue t-shirt.',
            isFavorite: false
        },
        {
            id: 'p3',
            title: 'Green Trousers',
            description: 'A pair of lightly green trousers.',
            isFavorite: false
        },
        {
            id: 'p4',
            title: 'Orange Hat',
            description: 'Street style! An orange hat.',
            isFavorite: false
        }
    ])

    const toogleFavorite = productId => {
        setProductsList(currentProdList => {
            const prodIndex = currentProdList.findIndex(
                p => p.id === productId
            )
            const updatedProducts = [...currentProdList];
            updatedProducts[prodIndex] = {
                ...currentProdList[prodIndex],
                isFavorite: !currentProdList[prodIndex].isFavorite
            }
            return updatedProducts
        })
    }

    return (
        <ProductsContext.Provider
            value={{ products: productsList, toogleFav: toogleFavorite }}>
            {props.children}
        </ProductsContext.Provider>
    )
}

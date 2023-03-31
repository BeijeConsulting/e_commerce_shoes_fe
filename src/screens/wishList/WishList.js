import React, { useEffect, useState } from 'react'

// Component
import WishListProductCard from '../../components/hookComponents/wishListProductCard/WishListProductCard'
// SCSS
import "./wishList.scss"
import { deleteWishList, getWishList } from '../../services/wishListServices'
import { useSelector } from 'react-redux'


function WishList(props) {
    const [state, setState] = useState([])
    let wistListItems = [] // inizializzo lista items
    const token = useSelector((state) => state.userDuck.token)

    useEffect(() => {
        fetchWishList()
    }, [])

    async function fetchWishList() {
        const response = await getWishList(token)
        console.log("RESPONSE-WISH", response)

        if (response.status === 200) {
            //la lista di prodotti nella wish è un array
            wistListItems = response.data?.items
            setState(wistListItems)
        }

    }

    async function deleteItem(param) {
        const response = await deleteWishList(param)
        console.log("RESPONSE-DELETE", response)

        if (response.status === 200) {
            const newItem = await getWishList(token)
            console.log("NEW-ITEM", newItem.data.items)
            setState(newItem.data.items)
        }
    }


    const mapWishList = (data) => {
        return (
            <div key={ data.id }>
                <WishListProductCard
                    name={ data.name }
                    listedPrice={ data.listedPrice }
                    brand={ data.brand }
                    image={ data.image }
                    deleteId={ data.id }
                    productId={ data.productId }
                    allItems={ state }
                    handleClick={ deleteItem }
                />
            </div>
        )
    }

    return (
        <div className='wishlist__container'>
            { state.map(mapWishList) }
        </div>
    )
}

export default WishList
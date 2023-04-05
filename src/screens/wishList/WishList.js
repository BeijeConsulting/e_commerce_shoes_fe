import React, { useEffect, useState } from "react";

// API
import { deleteWishList, getWishList } from "../../services/wishListServices";
import { getUserAuth } from "../../services/authServices";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../../redux/ducks/userDuck";
// Component
import Seo from "../../components/functionalComponents/Seo";
import WishListProductCard from "../../components/hookComponents/wishListProductCard/WishListProductCard";
// i18n
import { useTranslation } from "react-i18next";
// SCSS
import "./wishList.scss";

function WishList(props) {
  const [state, setState] = useState([]);
  let wistListItems = []; // inizializzo lista items
  let newWishList = null; // inizializzo lista items dopo aver eliminato un item
  let responseUserData = null; // inizializzo lista items
  const { t } = useTranslation();

  const dispatch = useDispatch();
  // const token = useSelector((state) => state.userDuck.token);

  useEffect(() => {
    fetchWishList();
  }, []);

  async function fetchWishList() {
    const response = await getWishList();

    if (response.status === 200) {
      //la lista di prodotti nella wish è un array
      wistListItems = response.data?.items;
    }
    setState(wistListItems);
  }

  async function deleteItem(param) {
    const responseDelete = await deleteWishList(param);

    if (responseDelete.status === 200) {
      // se eliminazione andata a buon fine, chiamo lista desideri aggiornata
      newWishList = await getWishList();
      // se eliminazione andata a buon fine, chiamo dati utente aggiornati
      responseUserData = await getUserAuth();
    }
    // aggiorno lo stato della lista desideri nello screen
    setState(newWishList.data.items);

    // aggiorno i dati di userDuck
    dispatch(
      setUserCredentials({
        isLogged: true,
        name: responseUserData.data.first_name,
        surname: responseUserData.data.last_name,
        email: responseUserData.data.email,
        adresses: [...responseUserData.data.addresses],
        birthDate: responseUserData.data.birth_date,
        cartItems: responseUserData.data.cart_items,
        wishlistItems: responseUserData.data.wish_list_item,
      })
    );
  }

  const mapWishList = (data) => {
    return (
      <div key={data.id}>
        <WishListProductCard
          name={data.name}
          listedPrice={data.listedPrice}
          brand={data.brand}
          image={data.image}
          deleteId={data.id}
          productId={data.productId}
          allItems={state}
          handleClick={deleteItem}
        />
      </div>
    );
  };

  return (
    <>
      <Seo
        title={t("wishList.title")}
        description="La tua Lista desideri"
        content="e-commerce"
      />
      <div className="wishlist">
        <h1>{t("wishList.title")}</h1>

        <div className="wishlist__container">{state.map(mapWishList)}</div>

        <div className="wishlist__empty">
          {state.length === 0 && <p>{t("wishList.empty")}.</p>}
        </div>
      </div>
    </>
  );
}

export default WishList;

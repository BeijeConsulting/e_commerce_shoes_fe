import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity } from "../../redux/ducks/productCartDuck";
import { setUserCredentials } from '../../redux/ducks/userDuck';
// API
import { getProduct } from "../../services/productServices";
import { addWishList, getWishList } from '../../services/wishListServices';
import { getUserAuth } from '../../services/authServices';
// ROUTER
import { useNavigate, useParams } from "react-router-dom";
// Components
import Button from "../../components/functionalComponents/button/Button";
import SingleProductSlider from "../../components/hookComponents/singleProductSlider/SingleProductSlider";
import InfoProductBox from "../../components/functionalComponents/infoProductBox/InfoProductBox";
import AccordionItem from "../../components/hookComponents/accordionItem/AccordionItem";
import Seo from "../../components/functionalComponents/Seo";
// Utils
import {
  setLocalStorage,
  getLocalStorage,
} from "../../utils/localStorageUtils";
// Library
import i18n from "../../assets/translations/i18n";
import { useTranslation } from 'react-i18next';
// Icons
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
// SCSS
import "./singleProduct.scss";

function SingleProduct() {
  const [state, setState] = useState({
    product: [],
    sizeSelected: false,
  });

  const { t } = useTranslation()

  const [stateAdded, setStateAdded] = useState(false) // serve per mostrare bottone aggiungi alla wishList o già aggiunto alla wishList

  const lang = i18n.language.slice(0, 2)

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartQuantity = useSelector((state) => state.userDuck.cartItems); //modificato lo state

  const userIsLogged = useSelector((state) => state.userDuck.isLogged)
  const token = useSelector((state) => state.userDuck.token)
  let sizeValue = useRef(null);

  useEffect(() => {
    fetchProduct();
    fetchWishList()
  }, [stateAdded]);

  async function fetchProduct() {
    const result = await getProduct(params.id, lang);
    setState({
      ...state,
      product: result.data
    });

  }

  async function fetchWishList() {
    let toggle = undefined
    const response = await getWishList(token)

    // check per controllare se è già presente nella wishlist
    const alreadyAdd = response.data.items.find(item => Number(item.productId) === Number(params.id))

    if (alreadyAdd) {
      toggle = true
    } else {
      toggle = false
    }
    setStateAdded(toggle)
  }

  ////////////////////////////////
  // funzone per aggiungere prodotto alla wishlist

  async function addToWishlist() {
    if (!userIsLogged) {
      navigate(`/${lang}/identity`)
    }

    await addWishList({
      productId: params.id,
    })
    // una volta aggiunto setto lo stato a true
    setStateAdded(true)
    // aggiorno la quantità in redux
    const responseUser = await getUserAuth(token);

    dispatch(
      setUserCredentials({
        isLogged: true,
        name: responseUser.data.first_name,
        surname: responseUser.data.last_name,
        email: responseUser.data.email,
        adresses: [...responseUser.data.addresses],
        birthDate: responseUser.data.birth_date,
        cartItems: responseUser.data.cart_items,
        wishlistItems: responseUser.data.wish_list_item,
      })
    )
    console.log("responseUser", responseUser)
  }

  ////////////////////////////////

  function updateCart() {
    let itemFound = undefined;
    let localData = getLocalStorage("cart-list");
    // console.log(localData);
    if (!state.sizeSelected) {
      // console.log("Seleziona una taglia");
      return;
    }

    dispatch(updateCartQuantity({ quantity: cartQuantity + 1 }));

    if (!localData) {
      localData = {
        info: {
          numberItems: 1,
          totalPrice: Number(state.product.listed_price).toFixed(2),
        },
        items: [
          {
            id: state.product.id.toString(),
            name: state.product.name,
            brand: state.product.brand,
            quantity: 1,
            image: state.product.images[0],
            size: sizeValue.current,
            sellingItemTotalPrice: Number(
              Number(state.product.listed_price).toFixed(2)
            ),
          },
        ],
      };
    } else {
      itemFound = localData.items.find((item) => {
        // console.log("item.size: " + item.size);
        // console.log("sizeValue: " + sizeValue.current);
        return (
          item.id.toString() === state.product.id.toString() &&
          item.size.toString() === sizeValue.current.toString()
        );
      });

      // console.log(itemFound);

      if (!itemFound) {
        // console.log("item not found");
        localData.items.push({
          id: state.product.id.toString(),
          name: state.product.name,
          brand: state.product.brand,
          quantity: 1,
          image: state.product.images[0],
          size: sizeValue.current,
          sellingItemTotalPrice: Number(
            Number(state.product.listed_price).toFixed(2)
          ),
        });

        localData.info.numberItems = Number(localData.info.numberItems) + 1;
        localData.info.totalPrice =
          Number(Number(localData.info.totalPrice).toFixed(2)) +
          Number(Number(state.product.listed_price).toFixed(2));

        // console.log("------------------");
      } else {
        // console.log("item found");

        // console.log(
        //   "itemFound.sellingItemTotalPrice " + itemFound.sellingItemTotalPrice
        // );
        // console.log("state.product.listed_price " + state.product.listed_price);

        itemFound.quantity = itemFound.quantity + 1;
        itemFound.sellingItemTotalPrice =
          Number(Number(itemFound.sellingItemTotalPrice).toFixed(2)) +
          Number(Number(state.product.listed_price).toFixed(2));

        localData.info.numberItems = localData.info.numberItems + 1;
        localData.info.totalPrice =
          Number(Number(localData.info.totalPrice).toFixed(2)) +
          Number(Number(state.product.listed_price).toFixed(2));

        // console.log(
        //   "itemFound.sellingItemTotalPrice " + itemFound.sellingItemTotalPrice
        // );
        // console.log("state.product.listed_price " + state.product.listed_price);
        // console.log("---------------------");
      }
    }
    // console.log(localData);

    setLocalStorage("cart-list", localData);
  }



  function renderSizesOption(size, key) {
    return (
      <option key={ key } value={ size.eu }>
        { size.eu }
      </option>
    );
  }

  function handleSelect(e) {
    if (e.target.value === "none") return;

    sizeValue.current = e.target.value;

    const newSize = state.product.productSizes.find((size) => {
      return size.eu === e.target.value;
    });
    // console.log(newSize.selling_price);
    setState({
      ...state,
      product: {
        ...state.product,
        listed_price: Number(newSize.selling_price).toFixed(2),
      },
      sizeSelected: true,
    });
  }

  return (
    <>
      <Seo
        title={ state.product?.name }
        description="Gestione del carrello"
        content="e-commerce"
      />
      <div className="single-product">
        <header>
          <div className="header__container">
            <p className="header__category">{ state.product?.category }</p>
            <p className="header__price">€ { state.product?.listed_price }</p>
          </div>
          <h2 className="header__brand">{ state.product?.brand }</h2>
          <p className="header__name">{ state.product?.name }</p>
        </header>

        <div className="info__container">
          <SingleProductSlider />

          <div className="info">
            {/* <p className="info__p">Input Select taglie</p> */ }
            <select
              className="info__select-size"
              onChange={ handleSelect }
              name="sizes"
            >
              <option value={ "none" } disabled={ state.sizeSelected }>
                { t("singleProduct.sizeSelect") }
              </option>
              { state.product?.productSizes?.map(renderSizesOption) }
            </select>
            <InfoProductBox />


            <Button
              handleClick={ updateCart }
              label={ t("button.addToCart") }
              buttonStyle={ "default-button" }
            />

            { !stateAdded &&
              <div className='info__container'>
                <p onClick={ addToWishlist }
                  className='info__wishlist'>
                  { t("singleProduct.addWishList") }
                  <span>
                    <AiOutlineHeart />
                  </span>
                </p>
              </div>
            }
            { stateAdded &&
              <div className='info__container'>
                <p onClick={ addToWishlist }
                  className='info__wishlist'>
                  { t("singleProduct.added") }
                  <span>
                    <AiFillHeart />
                  </span>
                </p>
              </div>
            }


            <p className="info__p">{ t("singleProduct.sizeTable") }</p>
            <AccordionItem />
          </div>
        </div>
      </div>
    </>
  );
}

SingleProduct.defaultProps = {};

SingleProduct.propTypes = {};

export default SingleProduct;

import React, { useState, useEffect, useRef } from "react";
import "./singleProduct.scss";
// import PropTypes from "prop-types";

import Button from "../../components/functionalComponents/button/Button";
import SingleProductSlider from "../../components/hookComponents/singleProductSlider/SingleProductSlider";
import InfoProductBox from "../../components/functionalComponents/infoProductBox/InfoProductBox";
import AccordionItem from "../../components/hookComponents/accordionItem/AccordionItem";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity } from "../../redux/ducks/userDuck";
import { getProduct } from "../../services/productServices";
import { useParams, useNavigate } from "react-router-dom";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../utils/localStorageUtils";
import Seo from "../../components/functionalComponents/Seo";
import { addItemToCartList, getCartList } from "../../services/cartServices";
import i18n from "../../assets/translations/i18n";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProduct() {
  const lang = i18n.language.slice(0, 2);
  const params = useParams();
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.userDuck.cartItems); //modificato lo state
  const isLogged = useSelector((state) => state.userDuck.isLogged);
  const navigate = useNavigate();
  // const token = useSelector((state) => state.tokenDuck.token);

  const [state, setState] = useState({
    product: [],
    selectedSize: false,
  });

  let sizeValue = useRef(null);
  let productDetailsId = useRef(null);

  useEffect(() => {
    fetchProduct();
  }, [lang]);

  async function fetchProduct() {
    const result = await getProduct(params.id, lang);
    setState({
      ...state,
      product: result.data,
    });
  }

  function notifyAddToCartSuccess() {
    toast.success("Aggiunto al carrello", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToCartError() {
    toast.error("Si è verificato un errore", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToCartSizeError() {
    toast.error("Devi selezionare una taglia", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToWishlistSuccess() {
    toast.success("Aggiunto alla whislist", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToWishlistError() {
    toast.success("Si è verificato un errore", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  async function updateCart() {
    let itemFound = undefined;
    let localData = getLocalStorage("cart-list");
    // console.log(localData);
    if (!state.selectedSize) {
      // console.log("Seleziona una taglia");
      notifyAddToCartSizeError();
      return;
    }

    if (!localData) {
      localData = {
        numberItems: 1,
        totalPrice: Number(state.product.listed_price).toFixed(2),

        items: [
          {
            item_id: null,
            productId: state.product.id.toString(),
            productDetailsId: productDetailsId.current,
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
          item.productId.toString() === state.product.id.toString() &&
          item.size.toString() === sizeValue.current.toString()
        );
      });

      // console.log(itemFound);

      if (!itemFound) {
        // console.log("item not found");
        localData.items.push({
          item_id: null,
          productId: state.product.id.toString(),
          productDetailsId: productDetailsId.current,
          name: state.product.name,
          brand: state.product.brand,
          quantity: 1,
          image: state.product.images[0],
          size: sizeValue.current,
          sellingItemTotalPrice: Number(
            Number(state.product.listed_price).toFixed(2)
          ),
        });

        localData.numberItems = Number(localData.numberItems) + 1;
        localData.totalPrice =
          Number(Number(localData.totalPrice).toFixed(2)) +
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

        localData.numberItems = localData.numberItems + 1;
        localData.totalPrice =
          Number(Number(localData.totalPrice).toFixed(2)) +
          Number(Number(state.product.listed_price).toFixed(2));

        // console.log(
        //   "itemFound.sellingItemTotalPrice " + itemFound.sellingItemTotalPrice
        // );
        // console.log("state.product.listed_price " + state.product.listed_price);
        // console.log("---------------------");
      }
    }
    // console.log(localData);
    if (isLogged) {
      try {
        const obj = {
          id: state.product.id,
          productDetailsId: productDetailsId.current,
          quantity: 1,
        };
        console.log(obj);
        const addItem = await addItemToCartList(obj);
        console.log(addItem);

        const localDataResponse = await getCartList();
        if (localDataResponse.status === 200) {
          localData = localDataResponse.data;
        }
        console.log("aggiunto");

        console.log("UPDATE");
        dispatch(updateCartQuantity(cartQuantity + 1));

        notifyAddToCartSuccess();
      } catch {
        notifyAddToCartError();
      }
    }

    setLocalStorage("cart-list", localData);
    if (!isLogged) notifyAddToCartSuccess();
  }

  function renderSizesOption(size, key) {
    return (
      <option key={key} value={size.eu}>
        {size.eu}
      </option>
    );
  }

  function handleSelect(e) {
    if (e.target.value === "none") return;

    sizeValue.current = e.target.value;

    const newSize = state.product.productSizes.find((size) => {
      return size.eu === e.target.value;
    });

    productDetailsId.current = newSize.productDetailsId;
    // console.log(newSize.selling_price);
    setState({
      ...state,
      product: {
        ...state.product,
        listed_price: Number(newSize.selling_price).toFixed(2),
      },
      selectedSize: true,
    });
  }

  function goToBrandPage() {
    navigate(`/${lang}/brand/${state.product?.brand.toLowerCase()}`);
  }

  return (
    <>
      <Seo
        title={state.product?.name}
        description="Gestione del carrello"
        content="e-commerce"
      />
      <div className="single-product">
        <header>
          <div className="header__container">
            <p className="header__category">{state.product?.category}</p>
            <p className="header__price">
              {state.selectedSize
                ? `${state.product?.listed_price}€`
                : `prezzo di listino ${state.product?.listed_price}€`}
            </p>
          </div>
          <h2 className="header__brand">
            <a onClick={goToBrandPage}>{state.product?.brand}</a>
          </h2>
          <p className="header__name">{state.product?.name}</p>
        </header>

        <div className="info__container">
          <SingleProductSlider />

          <div className="info">
            {/* DA SISTEMARE */}
            <p className="info__p">Input Select taglie</p>
            <select
              className="info__select-size"
              onChange={handleSelect}
              name="sizes"
            >
              <option value={"none"} disabled={state.selectedSize}>
                Seleziona taglia
              </option>
              {state.product?.productSizes?.map(renderSizesOption)}
            </select>
            <InfoProductBox />

            <Button
              handleClick={updateCart}
              label={"AGGIUNGI AL CARRELLO"}
              buttonStyle={"default-button"}
            />
            <p className="info__p">Tabella taglie</p>
            <AccordionItem
              productDescription={state.product?.description}
              productBrand={state.product?.brand}
            />
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar />
    </>
  );
}

SingleProduct.defaultProps = {};

SingleProduct.propTypes = {};

export default SingleProduct;

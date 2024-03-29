import React, { useState, useEffect, useRef } from "react";
// import PropTypes from "prop-types";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity } from "../../redux/ducks/userDuck";
import { setUserCredentials } from "../../redux/ducks/userDuck";
// API
import { getProduct } from "../../services/productServices";
import { addWishList, getWishList } from "../../services/wishListServices";
import { getUserAuth } from "../../services/authServices";
// ROUTER
import { useNavigate, useParams } from "react-router-dom";
// Components
import Button from "../../components/functionalComponents/button/Button";
import SingleProductSlider from "../../components/hookComponents/singleProductSlider/SingleProductSlider";
import InfoProductBox from "../../components/functionalComponents/infoProductBox/InfoProductBox";
import AccordionItem from "../../components/hookComponents/accordionItem/AccordionItem";
import Seo from "../../components/functionalComponents/Seo";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
// Utils
import {
  setLocalStorage,
  getLocalStorage,
} from "../../utils/localStorageUtils";
// Library
import i18n from "../../assets/translations/i18n";
import { useTranslation } from "react-i18next";
// Icons
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// SCSS
import "./singleProduct.scss";
import { addItemToCartList, getCartList } from "../../services/cartServices";

function SingleProduct() {
  const lang = i18n.language.slice(0, 2);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartQuantity = useSelector((state) => state.userDuck.cartItems); //modificato lo state
  const isLogged = useSelector((state) => state.userDuck.isLogged);
  let sizeValue = useRef(null);
  let productDetailsId = useRef(null);
  const { t } = useTranslation();

  const [state, setState] = useState({
    product: null,
    selectedSize: false,
    wishlist: false,
  });

  useEffect(() => {
    fetchProduct();
  }, [lang]);

  async function fetchProduct() {
    const result = await getProduct(params.id, lang);
    let wishlist = null;
    if (isLogged) {
      wishlist = await fetchWishList();
    }
    setState({
      ...state,
      product: result.data,
      wishlist,
    });
  }

  async function fetchWishList() {
    let wishlist = false;
    const response = await getWishList();

    // check per controllare se è già presente nella wishlist
    const alreadyAdd = response.data.items.find(
      (item) => Number(item.productId) === Number(params.id)
    );

    if (alreadyAdd) {
      wishlist = true;
    }

    return wishlist;
  }

  ////////////////////////////////
  // funzone per aggiungere prodotto alla wishlist

  async function addToWishlist() {
    let wishlist = false;
    if (!isLogged) {
      navigate(`/${lang}/accedi`);
      return;
    }

    const wishlistResp = await addWishList({
      productId: params.id,
    });

    if (wishlistResp.status < 300) {
      notifyAddToWishlistSuccess();

      // una volta aggiunto setto lo stato a true
      wishlist = true;

      // aggiorno la quantità in redux
      const responseUser = await getUserAuth();

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
      );
    } else {
      notifyAddToWishlistError();
    }

    setState({
      ...state,
      wishlist,
    });
  }

  ////////////////////////////////

  function notifyAddToCartSuccess() {
    toast.success(t("toastify.singleProduct.addCartSuccess"), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToCartError() {
    toast.error(t("toastify.singleProduct.addCartError"), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToCartSizeError() {
    toast.error(t("toastify.singleProduct.addCartSizeError"), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToWishlistSuccess() {
    toast.success(t("toastify.singleProduct.addWishlistSuccess"), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyAddToWishlistError() {
    toast.error(t("toastify.singleProduct.addWishlistError"), {
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
      const obj = {
        id: state.product.id,
        productDetailsId: productDetailsId.current,
        quantity: 1,
      };

      const addItem = await addItemToCartList(obj);
      // console.log(addItem);

      if (addItem.status < 300) {
        const localDataResponse = await getCartList();
        if (localDataResponse.status === 200) {
          localData = localDataResponse.data;
        }
        // console.log("aggiunto");

        // console.log("UPDATE");
        dispatch(updateCartQuantity(cartQuantity + 1));

        notifyAddToCartSuccess();
      } else {
        notifyAddToCartError();
      }
    }

    setLocalStorage("cart-list", localData);
    if (!isLogged) notifyAddToCartSuccess();
  }

  function renderSizesOption(size, key) {
    return (
      <option key={key} value={size.eu}>
        {`EU ${size.eu.slice(1, size.eu.length)} / UK ${size.uk.slice(
          1,
          size.uk.length
        )} / USA ${size.usa.slice(1, size.usa.length)}`}
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
          {state.product ? (
            <>
              <div className="header__container">
                <p className="header__category">{state.product.category}</p>
                <p className="header__price">
                  {state.selectedSize
                    ? `${state.product.listed_price}€`
                    : `${t("singleProduct.listedPrice")} ${
                        state.product?.listed_price
                      }€`}
                </p>
              </div>
              <h2 className="header__brand">
                <a onClick={goToBrandPage}>{state.product?.brand}</a>
              </h2>
              <p className="header__name">{state.product?.name}</p>
            </>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Skeleton
                variant="rectangular"
                height={100}
                style={{ marginBottom: "20" }}
              />
            </Box>
          )}
        </header>

        <div className="info__container">
          {state.product ? (
            <SingleProductSlider images={state.product.images} />
          ) : (
            <div className="slider">
              <Box sx={{ width: "100%" }}>
                <Skeleton variant="rectangular" height={700} />
              </Box>
            </div>
          )}

          <div className="info">
            <select
              className="info__select-size"
              onChange={handleSelect}
              name="sizes"
            >
              <option value={"none"} disabled={state.selectedSize}>
                {t("singleProduct.sizeSelect")}
              </option>
              {state.product?.productSizes?.map(renderSizesOption)}
            </select>
            <InfoProductBox />

            <Button
              handleClick={updateCart}
              label={t("button.addToCart")}
              buttonStyle={"default-button"}
            />

            {!state.wishlist && (
              <div className="info__container">
                <p onClick={addToWishlist} className="info__wishlist">
                  {t("singleProduct.addWishList")}
                  <span>
                    <AiOutlineHeart />
                  </span>
                </p>
              </div>
            )}
            {state.wishlist && (
              <div className="info__container">
                <p onClick={addToWishlist} className="info__wishlist">
                  {t("singleProduct.added")}
                  <span>
                    <AiFillHeart />
                  </span>
                </p>
              </div>
            )}

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

export default SingleProduct;

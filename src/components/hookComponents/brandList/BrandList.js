import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import { getBrands } from "../../../services/productServices";
import _ from "lodash";
import "./brandList.scss";
import i18n from "../../../assets/translations/i18n";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function BrandList(props) {
  const { t } = useTranslation()
  const lang = i18n.language.slice(0, 2);
  const navigate = useNavigate();

  const [state, setState] = useState({
    // letter: null,
    // brands: null,
    resultBrandList: null,
  });

  // const navigate = useNavigate();

  useEffect(() => {
    getAllBrands();
  }, []);

  async function getAllBrands() {
    const allBrands = await getBrands();
    if (allBrands.status === 200) {
      const result = _(allBrands.data)
        .groupBy((o) => o.brand[0].toUpperCase())
        .map((brands, letter) => ({ letter, brands }))
        .value();

      setState({
        ...state,
        resultBrandList: result,
      });
    }
  }

  const goToBrand = (brand) => () => {
    const formattedBrand = brand.split(" ").join("-");
    navigate(`/${lang}/brand/${formattedBrand}`);
  }

  return (
    <div className="brandList">
      <h1 className="brandList__h1">{ t("header.allBrands") }</h1>

      <div className="brandList__container">
        <ul className="brandList__grid">
          { state.resultBrandList &&
            state.resultBrandList.map((el, key) => {
              return (
                <div className="cell" key={ key }>
                  <h3 className="brandList__h3">{ el.letter }</h3>
                  <ul className="brandList__brands">
                    { el.brands.map((brands, key) => {
                      return (
                        <li key={ "0" + key }>
                          <a onClick={ goToBrand(brands.brand.toLowerCase()) }>
                            { brands.brand }
                          </a>
                        </li>
                      );
                    }) }
                  </ul>
                </div>
              );
            }) }
        </ul>
      </div >
    </div >
  );
}

BrandList.defaultProps = {};

BrandList.propTypes = {};

export default BrandList;

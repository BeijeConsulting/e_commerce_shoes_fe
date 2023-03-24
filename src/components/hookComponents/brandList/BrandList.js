import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../../../services/productServices";
import _, { result } from "lodash";
import { Link } from "react-router-dom";
import "./brandList.scss";

function BrandList(props) {
  const [state, setState] = useState({
    // letter: null,
    // brands: null,
    resultBrandList: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllBrands();
  }, []);

  async function getAllBrands() {
    const allBrands = await getBrands();
    if (allBrands.status === 200) {
      console.log(allBrands.data);
      const result = _(allBrands.data)
        .groupBy((o) => o.brand[0].toUpperCase())
        .map((brands, letter) => ({ letter, brands }))
        .value();
      console.log(result);

      setState({
        ...state,
        resultBrandList: result,
      });
    }
  }

  return (
    <div className="brandList">
      <h1 className="brandList__h1">BrandList</h1>

      <div className="brandList__container">
        <ul className="brandList__grid">
          {state.resultBrandList &&
            state.resultBrandList.map((el, key) => {
              return (
                <div className="cell" key={key}>
                  <h3 className="brandList__h3">{el.letter}</h3>
                  <ul className="brandList__brands">
                    {el.brands.map((brands, key) => {
                      return (
                        <li key={"0" + key}>
                          <Link to={`/brands/${brands.brand}`}>
                            {brands.brand}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

BrandList.defaultProps = {};

BrandList.propTypes = {};

export default BrandList;

import React from "react";
import "./productGridLayout.scss";

function ProductGridLayout(props) {
  return <div className="grid-list">{props.children}</div>;
}

export default ProductGridLayout;

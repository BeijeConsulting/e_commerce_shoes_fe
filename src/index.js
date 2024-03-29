import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style/common/common.scss";
import Routing from "./routing/Routing";
import { Provider } from "react-redux";
import store from "./redux/store";
import ScrollToTop from "./screens/scrollToTop/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop>
        <Routing />
      </ScrollToTop>
    </Provider>
  </BrowserRouter>
);

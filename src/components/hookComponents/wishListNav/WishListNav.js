import React from "react";
// import PropTypes from 'prop-types';

// MUI
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge, IconButton } from "@mui/material";
// Redux
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// SCSS
import "./wishListNav.scss";
import { useNavigate } from "react-router-dom";
// import { red } from "@mui/material/colors";

function WishListNav() {
  const wishListitemQuantity = useSelector(
    (state) => state.userDuck.wishlistItems
  );
  const navigate = useNavigate();

  function goToWishlist() {
    navigate("area-personale/lista-desideri");
  }

  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={goToWishlist}
      color="inherit"
    >
      <Badge badgeContent={wishListitemQuantity} color="primary">
        <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
      </Badge>
    </IconButton>
  );
}

export default WishListNav;

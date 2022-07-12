import { useEffect, useState } from "react";
import Coupon from "../../modal/Coupon";
import { store } from "../../redux/store";
import "./cart.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Cart(): JSX.Element {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("../shoppingCart");
    };

    let cartCoupons = useSelector((selectStore: any) => {
        return selectStore.cartState.coupons;
    });
    
    return (
        <div className="cart">
        <IconButton onClick={handleClick}>
            <Badge color="primary" badgeContent={cartCoupons.length}>
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
        </div>
    );
}

export default Cart;

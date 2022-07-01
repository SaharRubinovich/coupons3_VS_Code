import { Backdrop, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Coupon from "../../modal/Coupon";
import { purchaseItem, toggleCart } from "../../redux/cartState";
import { store } from "../../redux/store";
import "./cart.css";
import SingleCartItem from "./singleCartItem/singleCartItem";

function Cart(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(()=>{
        setCoupons(store.getState().cartState.coupons);
    },[store.getState().cartState.coupons]);

    const purchaseHandler = () => {
        store.dispatch(purchaseItem())
    };

    const closeWindow = () => {
        store.dispatch(toggleCart())
    };

    return (
        <div className="cart">
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={store.getState().cartState.isOpen}
        onClick={closeWindow}>
            <div className="cartBox">
			{coupons.map(item=> <SingleCartItem key={item.id} coupon={item}/>)}
            <br/><br/>
            <Button variant="contained" color="primary" onClick={purchaseHandler}>רכישה</Button>
            <Button variant="contained" color="error" onClick={closeWindow}>סגירה</Button>
            </div>
            </Backdrop>
        </div>
    );
}

export default Cart;

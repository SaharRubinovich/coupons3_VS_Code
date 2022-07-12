import { Button } from "@mui/material";
import Coupon from "../../../modal/Coupon";
import SingleCoupon from "../../user/allCoupons/SingleCoupon/SingleCoupon";
import "./singleCartItem.css";
import { removeItem } from './../../../redux/cartState';
import { store } from "../../../redux/store";

interface SingleCartItemProps{
    coupon: Coupon
}

function SingleCartItem(props: SingleCartItemProps): JSX.Element {


    return (
        <div className="singleCartItem SolidBox">

        </div>
    );
}

export default SingleCartItem;

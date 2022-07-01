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

    const removeHandler = () => {
        store.dispatch(removeItem(props.coupon.id));
    };
    return (
        <div className="singleCartItem SolidBox">
			<SingleCoupon key={props.coupon.id} coupon={props.coupon}/>
            <Button variant="contained" color="error" onClick={removeHandler}>הסר</Button>
        </div>
    );
}

export default SingleCartItem;

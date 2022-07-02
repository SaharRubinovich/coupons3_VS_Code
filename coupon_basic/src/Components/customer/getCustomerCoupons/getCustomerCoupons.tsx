import "./getCustomerCoupons.css";
import { useEffect, useState } from 'react';
import Coupon from "../../../modal/Coupon";
import { store } from "../../../redux/store";
import SingleCoupon from "../../user/allCoupons/SingleCoupon/SingleCoupon";

function GetCustomerCoupons(): JSX.Element {
    const [coupons,setCoupons] = useState<Coupon[]>([]);
    const [valid, isValid] = useState(false);

    useEffect(()=>{
        setCoupons(store.getState().authState.customer.coupons);
        if(coupons.length !== undefined){
            isValid(true);
        }
    },[])

    const display = () => {
        return(<>{coupons.length < 1 ? "לא נמצאו קופונים" : coupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}</>)
    };

    return (
        <div className="getCustomerCoupons">
			<h1>הקופונים שלי</h1><hr/>
            {valid?display():"לא נמצאו קופונים"}
        </div>
    );
}

export default GetCustomerCoupons;

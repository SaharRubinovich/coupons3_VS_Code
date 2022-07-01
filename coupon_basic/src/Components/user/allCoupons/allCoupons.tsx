import "./allCoupons.css";
import { useState } from 'react';
import Coupon from "../../../modal/Coupon";
import { useEffect } from 'react';
import { store } from "../../../redux/store";
import SingleCoupon from "./SingleCoupon/SingleCoupon";

function AllCoupons(): JSX.Element {
    const [couopns, setCoupons] = useState<Coupon[]>([]);

    useEffect(()=>{
        setCoupons(store.getState().couponsState.coupons);
    },[])

    return (
        <div className="allCoupons">
			<h1>קופונים במערכת</h1><hr/>
            {couopns.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default AllCoupons;

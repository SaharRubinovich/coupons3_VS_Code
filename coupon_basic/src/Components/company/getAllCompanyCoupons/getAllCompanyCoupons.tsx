import "./getAllCompanyCoupons.css";
import { useState, useEffect } from 'react';
import Coupon from './../../../modal/Coupon';
import { store } from "../../../redux/store";
import { useNavigate } from 'react-router-dom';
import SingleCoupon from './../../user/allCoupons/SingleCoupon/SingleCoupon';

function GetAllCompanyCoupons(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(()=>{
        if(store.getState().authState.userType === "COMPANY"){
            setCoupons(store.getState().companyState.company.coupons);
        }
        else{
            navigate("../login", {replace:true});
        }
    },[]);
    return (
        <div className="getAllCompanyCoupons">
			<h1>הקופונים של החברה</h1><hr/>
            {coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default GetAllCompanyCoupons;

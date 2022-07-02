import { Button, Input, TextField } from "@mui/material";
import { useState, useEffect, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import Coupon from "../../../modal/Coupon";
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import SingleCoupon from "../../user/allCoupons/SingleCoupon/SingleCoupon";
import "./getCustomerCouponsByMoney.css";

function GetCustomerCouponsByMoney(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
    const [price, setPrice] = useState(0);

    useEffect(()=>{
        if(store.getState().authState.userType != "CUSTOMER"){
            advNotify.error("User must be logged in");
            navigate("../login");
        }else{
            setCoupons(store.getState().authState.customer.coupons);
        }
    },[])

    useEffect(()=>{
        setFilteredCoupons(coupons.filter(item => item.price <= price));
    },[price]);

    const resetPrice = () => {
        setPrice(0);
        setFilteredCoupons(coupons);
    };

    const inputHandler = (args: SyntheticEvent) =>{
        setPrice(Number.parseFloat((args.target as HTMLInputElement).value));
    }
    return (
        <div className="getCustomerCouponsByMoney">
			<h1>הקופנים שלי לפי מחיר</h1><hr/>
            <TextField name="price" value={price} label="מחיר" onChange={inputHandler} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} helperText="חייב להיות מספר!"/>
            <Button variant="contained" color="error" onClick={resetPrice} style={{margin:"10px"}}>נקה בחירה</Button><br/><br/>
            {filteredCoupons.length > 0 ? filteredCoupons.map(item => <SingleCoupon key={item.id} coupon={item}/>): "לא נמצאו קופונים לפי מחיר מבוקש"}
        </div>
    );
}

export default GetCustomerCouponsByMoney;

import { Button, TextField } from "@mui/material";
import { SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Coupon from "../../../modal/Coupon";
import { store } from "../../../redux/store";
import SingleCoupon from "../../user/allCoupons/SingleCoupon/SingleCoupon";
import "./getCouponsByMaxPrice.css";

function GetCouponsByMaxPrice(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [filteredcoupons, setFilteredCoupons] = useState<Coupon[]>([]);
    const [price, setPrice] = useState(0);
    const [userInput, setUserInput] = useState(0);

    useEffect(()=>{
        if(store.getState().authState.userType != "COMPANY"){
            return navigate("../login", {replace: true});
        } 
        setCoupons(store.getState().companyState.company.coupons);
        setFilteredCoupons(coupons);
    },[]);
    
    useEffect(()=>{
        setFilteredCoupons(coupons.filter(item => item.price == price));
    },[price])

    const resetChoice = () => {
        setPrice(0);
    };

    const changeHandler = (event: { target: { value: string; }; }) => {
        setUserInput(Number.parseFloat(event.target.value));
    };

    const searchHandler = () => {
        setPrice(userInput);
    };
    return (
        <div className="getCouponsByMaxPrice">
			<h1>קבלת קופנים לפי מחיר גבוה</h1><hr/>
            <TextField label="מחיר" name="price" onChange={changeHandler}/>
            <br/><br/>
            <Button variant="contained" color="primary" onClick={searchHandler}>חפש</Button>
            <Button variant="contained" color="error" onClick={resetChoice}>נקה בחירה</Button>
            <br/><br/>
            {filteredcoupons.length > 0 
            ? filteredcoupons.map(coupon => <SingleCoupon key={coupon.id} coupon={coupon}/>)
            :"No coupons match the wanted price"}
        </div>
    );
}

export default GetCouponsByMaxPrice;

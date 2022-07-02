import "./getCouponByCategory.css";
import { useNavigate } from 'react-router-dom';
import Coupon from "../../../modal/Coupon";
import { useEffect, useState } from "react";
import { store } from './../../../redux/store';
import { Button, MenuItem, Select } from "@mui/material";
import { categories } from "../../user/allCoupons/Categories/Categories";
import SingleCoupon from "../../user/allCoupons/SingleCoupon/SingleCoupon";

function GetCouponByCategory(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [filteredcoupons, setFilteredCoupons] = useState<Coupon[]>([]);
    const [category, setcategory] = useState('');

    useEffect(()=>{
        if(store.getState().authState.userType != "COMPANY"){
            return navigate("../login", {replace: true});
        } 
        setCoupons(store.getState().authState.company.coupons);
        setFilteredCoupons(coupons);
    },[])

    useEffect(()=>{
        setFilteredCoupons(coupons.filter(item => item.category == category));
    },[category])

    const choice = (event: { target: { value: string; }; }) => {
        setcategory(event.target.value as string);
    };

    const resetChoice = () =>{
        setcategory('');
    };

    return (
        <div className="getCouponByCategory">
			<h1>קבלת קופונים לפי קטגוריה</h1><hr/>
            <Select onChange={choice} style={{textAlign: 'center'}}>
                <MenuItem value={categories.COSMETICS}>Cosmetics</MenuItem>
                <MenuItem value={categories.ELECTRICITY}>Electricity</MenuItem>
                <MenuItem value={categories.FASHION}>Fasion</MenuItem>
                <MenuItem value={categories.FOOD}>Food</MenuItem>
                <MenuItem value={categories.GAMING}>Gaming</MenuItem>
                <MenuItem value={categories.HOME}>Home</MenuItem>
                <MenuItem value={categories.MOBILE}>Moblie</MenuItem>
                <MenuItem value={categories.OUTDOOR}>Outdoor</MenuItem>
                <MenuItem value={categories.PETS}>Pets</MenuItem>
                <MenuItem value={categories.PHARMACY}>Pharmacy</MenuItem>
                <MenuItem value={categories.RESTAURANTS}>Restaurants</MenuItem>
                <MenuItem value={categories.TOURISM}>Tourism</MenuItem>
            </Select>
            <br/><br/>
            <Button variant="contained" color="primary" onClick={resetChoice}>נקה בחירה</Button>
            <br/><br/>
            {filteredcoupons.length > 0 
            ? filteredcoupons.map(coupon => <SingleCoupon key={coupon.id} coupon={coupon}/>)
            :"No coupons match the wanted category"}
        </div>
    );
}

export default GetCouponByCategory;

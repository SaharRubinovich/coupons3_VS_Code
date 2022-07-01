import "./getCustomerCouponsByCategory.css";
import { useState, useEffect } from 'react';
import Coupon from "../../../modal/Coupon";
import { store } from "../../../redux/store";
import { useNavigate } from 'react-router-dom';
import advNotify from "../../../util/notify_advanced";
import SingleCoupon from "../../user/allCoupons/SingleCoupon/SingleCoupon";
import { Select, MenuItem, Button } from "@mui/material";
import { categories } from "../../user/allCoupons/Categories/Categories";

function GetCustomerCouponsByCategory(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
    const [category, setCategory] = useState('');

    useEffect(()=>{
        if(store.getState().authState.userType != "CUSTOMER"){
            advNotify.error("User must be logged in");
            navigate("../login");
        }else{
            setCoupons(store.getState().customersState.customer.coupons);
        }
    },[])
    
    useEffect(()=>{
        setFilteredCoupons(coupons.filter(item=>item.category == category));
    },[category])

    const categoryHandler = (event: { target: { value: string; }; }) => {
        setCategory(event.target.value as string);
    };
    const clearHandler = () => {
        setCategory('');
        setFilteredCoupons(coupons);
    };
    return (
        <div className="getCustomerCouponsByCategory">
			<h1>הקופונים שלי לפי קטגוריה</h1><hr/>
            <Select onChange={categoryHandler} style={{textAlign: 'center'}}>
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
            <Button variant="contained" color="error" onClick={clearHandler}>נקה בחירה</Button>
            <br/><br/>
            {filteredCoupons.length > 0 ? filteredCoupons.map(item=><SingleCoupon key={item.id} coupon={item}/>):"לא נמצאו קופונים לפי הקטגוריה המבוקשת"}
        </div>
    );
}

export default GetCustomerCouponsByCategory;

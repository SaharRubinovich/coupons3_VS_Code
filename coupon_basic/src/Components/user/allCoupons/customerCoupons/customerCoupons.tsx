import Coupon from "../../../../modal/Coupon";
import SingleCoupon from "../SingleCoupon/SingleCoupon";
import "./customerCoupons.css";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { store } from "../../../../redux/store";
import { Button } from "@mui/material";
import { Filter } from "@mui/icons-material";

interface stateType{
    from: {id : number}
}


function CustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = location.state as any;

    useEffect(()=>{
        //console.log(id);
        const customer =store.getState().customersState.customers.find(item => item.id == (id as number));
        //console.log(customer);
        setCoupons(customer.coupons);
    },[])
    const backHandler = () => {
        navigate("../admin/getAllCustomers",{replace:true})
    };
    return (
        <div className="customerCoupons">
            <Button variant="contained" color="info" onClick={backHandler}>חזרה</Button><br/>
			{coupons.map(coupon => <SingleCoupon key={coupon.id} coupon={coupon}/>)}
        </div>
    );
}

export default CustomerCoupons;

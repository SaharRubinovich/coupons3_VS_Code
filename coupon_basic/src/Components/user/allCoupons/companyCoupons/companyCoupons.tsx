import Coupon from "../../../../modal/Coupon";
import SingleCoupon from "../SingleCoupon/SingleCoupon";
import "./companyCoupons.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { store } from "../../../../redux/store";
import { Button } from "@mui/material";

interface stateType{
    from: {id : number}
}

function CompanyCoupons(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const {id} = location.state as any;

    useEffect(()=>{
        //console.log(id);
        setCoupons(store.getState().couponsState.coupons.filter(item => item.companyId == (id as number)))
    },[])
    const returnButton = () => {
        navigate("../admin/getAllCompanies",{replace:true})
    };
    return (
        <div className="companyCoupons">
            <Button color="info" variant="contained" onClick={returnButton}>חזרה</Button><br/>
			{coupons.map(coupon => <SingleCoupon key={coupon.id} coupon={coupon}/>)}
        </div>
    );
}

export default CompanyCoupons;

import "./deleteCoupon.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";
import { store } from "../../../redux/store";
import { DeleteCoupon as deleteCoupon } from './../../../redux/couponsState';

interface stateId{
    from: {id:number}
}

function DeleteCouponPage(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();

    const {id} = location.state as any;

    useEffect(()=>{
        if(store.getState().authState.userType === "COMPANY"){
        jwtAxios.delete(globals.urls.deleteCoupon + id)
        .then(response => {
            if(response.status < 300){
                store.dispatch(deleteCoupon(id));
                advNotify.success("קופון נמחק!");
                navigate("../company/getAllCompanyCoupons", {replace:true});
            } else{
                advNotify.error("יש לנו בעיה חביבי");
            }
        })
        .catch(err => {
            advNotify.error(err.message);
        })
        
    }else{
        advNotify.error("Must be logged in");
        navigate("/login");
    }
    },[])

    return (
        <div className="deleteCoupon">
        </div>
    );
}

export default DeleteCouponPage;

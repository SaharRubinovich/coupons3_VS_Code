import { Button } from "@mui/material";
import { Card } from "react-bootstrap";
import Coupon from "../../../../modal/Coupon";
import "./SingleCoupon.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { store } from "../../../../redux/store";
import { addItem } from "../../../../redux/cartState";
import couponImg from "../../../../assets/coupon.png"
import jwtAxios from "../../../../util/JWTaxios";
import globals from "../../../../util/global";
import advNotify from "../../../../util/notify_advanced";
import {  purchaseItem } from "../../../../redux/authState";
import { DeleteCoupon, UpdateCoupon } from "../../../../redux/couponsState";
import { useSelector } from "react-redux";

interface SingleCouponProps {
	coupon: Coupon;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    // const [validCoupon, setValidCoupon] = useState(true);
    const [amount, setAmount] = useState(props.coupon.amount);
    const [isLoading, setIsLoading] = useState(false);

    const myCoupons: Coupon[] = useSelector((reduxStore:any) => {
        return reduxStore.authState.customer.coupons;
    });

    const onClickDelete = () => {
        // navigate("../company/deleteCoupon", {replace:true, state:{id: props.coupon.id}});
        jwtAxios.delete(globals.urls.deleteCoupon + props.coupon.id)
        .then(response => {
            if(response.status < 300){
                store.dispatch(DeleteCoupon(props.coupon.id));
                advNotify.success("קופון נמחק!");
                navigate("../company/getAllCompanyCoupons", {replace:true});
            } else{
                advNotify.error("יש לנו בעיה חביבי");
            }
        })
        .catch(err => {
            advNotify.error(err.response.data.message + err.response.data.description);
        })
    };
    const onClickUpdate = () => {
        navigate("../company/updateCoupon", {state:{id:props.coupon.id}});
    };

    const addToCartButton = () => {
        setIsLoading(true)
        jwtAxios.put(globals.urls.purchaseCoupon, props.coupon)
      .then(response => {
        if(response.status < 300){
          const newCoupon = {...props.coupon}
          newCoupon.amount = props.coupon.amount - 1;
          store.dispatch(UpdateCoupon(newCoupon));
          store.dispatch(purchaseItem(newCoupon));
          advNotify.success("קופון נרכש");
        } else{
          advNotify.error("בעיה ברכישת קופון");
        }
        setIsLoading(false)
      })
      .catch(err =>{
        console.log(err);
        advNotify.error(err.response.data.message + err.response.data.description);
        setIsLoading(false)
      })
    };

    useEffect(()=>{
        setUserType(store.getState().authState.userType);
    },[])

    store.subscribe(()=>{
        if(store.getState().couponsState.coupons.find(item => item.id == props.coupon.id).amount != amount){
            setAmount(store.getState().couponsState.coupons.find(item => item.id == props.coupon.id).amount)
        }
    })
    return (
        <div className="SingleCoupon SolidBox" dir="rtl">
			<Card style={{maxWidth: "300px", maxHeight: "600px"}}>
                <Card.Img variant="top" src={couponImg} style={{maxWidth:"220px"}}/>
                <Card.Body>
                    <Card.Title>{props.coupon.title}</Card.Title>
                    <Card.Text>{props.coupon.category}</Card.Text>
                    <Card.Text>{props.coupon.description}</Card.Text>
                    <Card.Text>{props.coupon.startDate + ' - ' + props.coupon.endDate}</Card.Text>
                    <Card.Text>{"כמות: " + amount}</Card.Text>
                    <Card.Text>{"מחיר: " + props.coupon.price}</Card.Text>
                    {userType == "COMPANY" ? <><Button variant="contained" color="primary" onClick={onClickUpdate} style={{ margin: "10px" }}>עדכן קופון</Button>
                    <Button variant="contained" color="error" onClick={onClickDelete} style={{ margin: "10px" }}>מחק קופון</Button></> : ''}
                    {userType == "CUSTOMER" ? <><Button variant="contained" color="primary" onClick={addToCartButton} disabled={(myCoupons.findIndex(coupon => coupon.id == props.coupon.id) >= 0) || isLoading || props.coupon.amount == 0}>רכוש</Button></>:''}
                </Card.Body>
            </Card>
        </div>
    );
}

export default SingleCoupon;

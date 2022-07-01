import { Button } from "@mui/material";
import { Card } from "react-bootstrap";
import Coupon from "../../../../modal/Coupon";
import "./SingleCoupon.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { store } from "../../../../redux/store";
import { addItem } from "../../../../redux/cartState";

interface SingleCouponProps {
	coupon: Coupon;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [validCoupon, setValidCoupon] = useState(true);
    const [amount, setAmount] = useState(props.coupon.amount);

    const onClickDelete = () => {
        navigate("../company/deleteCoupon", {replace:true, state:{id: props.coupon.id}});
    };
    const onClickUpdate = () => {
        navigate("../company/updateCoupon", {state:{id:props.coupon.id}});
    };

    const addToCartButton = () => {
        store.dispatch(addItem(props.coupon));
    };

    useEffect(()=>{
        setUserType(store.getState().authState.userType);
        if(userType == "CUSTOMER"){
            if(store.getState().customersState.customer.coupons.find(item => item.id == props.coupon.id)){
                setValidCoupon(false);
            }
        }
    },[])
    store.subscribe(()=>{
        if(store.getState().couponsState.coupons.find(item => item.id == props.coupon.id).amount != amount){
            setAmount(store.getState().couponsState.coupons.find(item => item.id == props.coupon.id).amount)
        }
    })
    return (
        <div className="SingleCoupon SolidBox" dir="rtl">
			<Card>
                <Card.Img variant="top" src={props.coupon.image}/>
                <Card.Body>
                    <Card.Title>{props.coupon.title}</Card.Title>
                    <Card.Text>{props.coupon.category}</Card.Text>
                    <Card.Text>{props.coupon.description}</Card.Text>
                    <Card.Text>{props.coupon.startDate + ' - ' + props.coupon.endDate}</Card.Text>
                    <Card.Text>{"כמות: " + amount}</Card.Text>
                    <Card.Text>{"מחיר: " + props.coupon.price}</Card.Text>
                    {userType == "COMPANY" ? <><Button variant="contained" color="primary" onClick={onClickUpdate} style={{ margin: "10px" }}>עדכן קופון</Button><Button variant="contained" color="error" onClick={onClickDelete} style={{ margin: "10px" }}>מחק קופון</Button></> : ''}
                    {userType == "CUSTOMER" ? <><Button variant="contained" color="primary" onClick={addToCartButton} disabled={!validCoupon}>הוספה לסל</Button></>:''}
                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default SingleCoupon;

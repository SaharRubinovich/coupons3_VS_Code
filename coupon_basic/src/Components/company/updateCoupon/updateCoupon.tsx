import { useLocation, useNavigate } from "react-router-dom";
import "./updateCoupon.css";
import { SyntheticEvent, useState } from 'react';
import Coupon from "../../../modal/Coupon";
import { useEffect } from 'react';
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import {UpdateCoupon as updateCoupon} from "../../../redux/couponsState";

interface stateId{
    from: {id:number}
}

function UpdateCoupon(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const [coupon,setCoupon] = useState(new Coupon);
    const [img, setImg] = useState(null);
    const {register,handleSubmit, formState:{errors}} = useForm<Coupon>();


    const {id} = location.state as any;

    useEffect(()=>{
        console.log(id);
        if(store.getState().authState.userType === "COMPANY"){
        setCoupon(store.getState().couponsState.coupons.find(item => item.id == id));
        } else{
            advNotify.error("Must be logged in");
            navigate("/login");
        }
    },[])

    const descriptionHander = (args:SyntheticEvent) => {
        coupon.description = (args.target as HTMLInputElement).value;
    }; 
    const priceHandler = (args:SyntheticEvent) => {
        coupon.price = Number.parseFloat((args.target as HTMLInputElement).value);
    };
    const amoutHandler = (args:SyntheticEvent) => {
        coupon.amount = Number.parseFloat((args.target as HTMLInputElement).value);
    };

    const imgChangeHandler = (event: { target: { files: any[]; }; }) => {
        setImg(event.target.files[0]);
    };

    const send = (msg:Coupon) => {
        console.log(msg);
        /**
        jwtAxios.put(globals.urls.updateCoupon,msg)
        .then(response=>{
            if (response.status < 300){
                advNotify.success("קופון עודכן");
                store.dispatch(updateCoupon(msg));
            } else {
                advNotify.error("Something went wrong");
            }
        })
        .catch(err =>{
            advNotify.error(err.message);
        })
         */
    };
    return (
        <div className="updateCoupon SolidBox">
			<h1>עידכון קופון</h1><hr/>
            <form onSubmit={handleSubmit(send)}>
            <TextField name="id" label="קוד" variant="outlined" {...register("id")} value={coupon.id} disabled/><br/><br/>
            <TextField name="companyId" label="קוד חברה" variant="outlined" {...register("companyId")} value={coupon.companyId} disabled/><br/><br/>
            <TextField name="description" label="תיאור" variant="outlined" multiline
                rows={4} {...register("description",{required:{value:true,message:"חייב להכניס תיאור"}})} value={coupon.description} onChange={descriptionHander}/>
                <span>{errors.description?.message}</span><br/><br/>
            <TextField name="amount" label="כמות" variant="outlined" {...register("amount",{required:{value:true,message:"יש להכניס כמות"}})} value={coupon.amount} onChange={amoutHandler}/><span>{errors.amount?.message}</span><br/><br/>
            <TextField name="price" label="מחיר" variant="outlined" {...register("price",{required:{value:true,message:"צריך לתת מחיר"}})} value={coupon.price} onChange={priceHandler}/><span>{errors.price?.message}</span><br/><br/>
            <DatePicker selected={coupon.startDate} onChange={(date:Date)=>{coupon.startDate = date}} required/><br/><br/>
            <DatePicker selected={coupon.endDate} onChange={(date:Date)=>{coupon.endDate = date}} required/><br/><br/><br/>
            <br/><br/>
            <Button variant="contained" color="primary" type="submit">עדכן קופון</Button>
            </form>
        </div>
    );
}

export default UpdateCoupon;

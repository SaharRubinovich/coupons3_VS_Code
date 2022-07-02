import { useLocation, useNavigate } from "react-router-dom";
import "./updateCoupon.css";
import { SyntheticEvent, useState } from 'react';
import Coupon from "../../../modal/Coupon";
import { useEffect } from 'react';
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import { useForm } from "react-hook-form";
import { Button, InputLabel, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import {UpdateCoupon as updateCoupon} from "../../../redux/couponsState";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as muiDatePicker } from '@mui/x-date-pickers/DatePicker';

interface stateId{
    from: {id:number}
}

function UpdateCoupon(): JSX.Element {
    const location = useLocation();
    const {id} = location.state as any;
    const navigate = useNavigate();
    const [coupon,setCoupon] = useState<Coupon>(store.getState().couponsState.coupons.find((item:Coupon) => item.id == id));
    const [startDate,setStartDate] = useState(new Date);
    const [endDate,setEndDate] = useState(new Date);
    const [startDateString,setStartDateString] = useState('');
    const [endDateString,setEndDateString] = useState('');
    const [img, setImg] = useState(null);
    const {register,handleSubmit, formState:{errors}} = useForm<Coupon>();


    const state = store.getState()
    useEffect(()=>{
        console.log(id);
        if(state.authState.userType === "COMPANY"){
        setStartDate(new Date(coupon.startDate));
        //setStartDateString();
        console.log(startDate);
       // console.log(startDateString);
        setEndDate(new Date(coupon.endDate));
       // setEndDateString(new Date(coupon.endDate).toLocaleDateString());
        console.log(endDate);
       // console.log(endDateString);
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
        msg.id = coupon.id;
        msg.companyId = coupon.companyId;
        msg.startDate = startDate;
        msg.endDate = endDate;
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
    if(!coupon){
        return (
            <div/>
        )
    }
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
            <InputLabel>תאריך התחלה</InputLabel>
            <DatePicker selected={startDate} strictParsing dateFormat="mm-dd-yyyy" openToDate={new Date(coupon.startDate)} placeholderText='text' onChange={(date:Date)=>{setStartDate(date)}} required/><br/><br/> 
            <InputLabel>תאריך סיום</InputLabel>
            <DatePicker selected={endDate} minDate={coupon.startDate} strictParsing dateFormat="mm-dd-yyyy" openToDate={new Date(coupon.endDate)} placeholderText='text' onChange={(date:Date)=>{setEndDate(date)}} required/><br/><br/>  
            <Button variant="contained" color="primary" type="submit">עדכן קופון</Button>
            </form>
        </div>
    );
}

export default UpdateCoupon;

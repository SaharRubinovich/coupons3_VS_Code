import { Select, MenuItem, TextField, Button, Input } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import Coupon from "../../../modal/Coupon";
import { categories } from "../../user/allCoupons/Categories/Categories";
import DatePicker from "react-datepicker";
import "./addCoupon.css";
import "react-datepicker/dist/react-datepicker.css";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";


function AddCoupon(): JSX.Element {
    const [category, setcategory] = useState('');
    const {register,handleSubmit, formState:{errors}} = useForm<Coupon>();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [title ,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    


    const choice = (event: { target: { value: string; }; }) => {
        setcategory(event.target.value as string);
    };
    const descriptionHandler = (args: SyntheticEvent)=>{
        setDescription((args.target as HTMLInputElement).value);
    }
    const amoutHandler = (args: SyntheticEvent) => {
        setAmount(Number.parseFloat((args.target as HTMLInputElement).value));
    };
    const priceHandler = (args: SyntheticEvent) => {
        setPrice(Number.parseFloat((args.target as HTMLInputElement).value));
    };
    const imgHandler = (event: { target: { files: (Blob | MediaSource)[]; }; }) => {
        setImage(URL.createObjectURL(event.target.files[0]));
        
    };

    const send = (coupon: Coupon) => {
        coupon.category = category;
        coupon.startDate = startDate;
        coupon.endDate = endDate;
        console.log(coupon);
        jwtAxios.post(globals.urls.addCoupon,coupon)
    };
    
    return (
        <div className="addCoupon">
			<h1>הוספת קופון</h1><hr/>
            <div className="SolidBox">
                <form onSubmit={handleSubmit(send)}>
                <TextField name="title" label="כותרת" variant="outlined"
                {...register("title")}
                />
                <br/><br/>
                <TextField name="description" label="תיאור" variant="outlined" multiline
                rows={4}
                {...register("description", {required:{value:true, message:"חייב להכניס תיאור"}})}
                onChange={descriptionHandler}
                />
                <section>{errors.description?.message}</section>
                <br/><br/>
                <TextField name="amout" label="כמות" variant="outlined"
                {...register("amount", {required:{value:true, message:"חייב להכניס כמות"}})}
                onChange={amoutHandler}
                />
                <section>{errors.amount?.message}</section>
                <br/><br/>
                <TextField name="price" label="מחיר" variant="outlined"
                {...register("price", {required:{value:true, message:"חייב להכניס מחיר"}})}
                onChange={priceHandler}
                />
                <section>{errors.price?.message}</section>
                <br/><br/>
                <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} required/>
                <br/><br/>
                <DatePicker selected={endDate} minDate={startDate} onChange={(date:Date) => setEndDate(date)} required/>
                <br/><br/>
                <Select label="Category" name="Category" onChange={choice} style={{textAlign: 'center'}}>
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
            <Button variant="contained" color="primary" type="submit">צור קופון</Button>
                </form>
            </div>
        </div>
    );
}

export default AddCoupon;

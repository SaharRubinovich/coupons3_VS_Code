import "./updateCustomer.css";
import Customer from "../../../modal/Customer";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormHelperText, Input, OutlinedInput, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import { SyntheticEvent, useEffect, useState } from "react";
import { store } from "../../../redux/store";
import { updateCustomer } from "../../../redux/customersState";

import advNotify from "../../../util/notify_advanced";

interface customerID{
    from: {id:number}
}

function UpdateCustomer(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const [customer,setCustomer] = useState(new Customer);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register,handleSubmit, formState:{errors}} = useForm<Customer>();

    const { id } = location.state as any;


    useEffect(()=>{
        if(store.getState().authState.userType != "ADMIN"){
            return navigate("/login");
        }
        if(id===undefined){
            return navigate("/getAllCustomers");
        }
        setCustomer(store.getState().customersState.customers.find(item => item.id == id));
    },[])

    useEffect(()=>{
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setEmail(customer.email);
        setPassword(customer.password);
    },[customer.id])

    const send= (msg:Customer) => {
        msg.id=customer.id;
        console.log(msg);
        
        jwtAxios.put(globals.urls.UpdateCustomer,msg)
        .then(response => {
            console.log(response);
            store.dispatch(updateCustomer(msg));
            navigate("../admin/getAllCustomers",{replace:true});
        })
        .catch(err => {
            console.log(err);
            advNotify.error(err.response);
        })
       
    };
    
    const firstNameHandler = (event: { target: { value: string; }; }) => {
        setFirstName(event.target.value as string);
        } 
    const lastNameHandler = (event: { target: { value: string; }; }) => {
        setLastName(event.target.value as string);    
    } 
    const passwordHandler = (event: { target: { value: string; }; }) => {
        setPassword(event.target.value as string);
    } 
    const emailHandler = (event: { target: { value: string; }; }) => {
        setEmail(event.target.value as string);
    }
    return (
        <div className="updateCustomer SolidBox" dir="ltr">
			<h1 style={{textAlign: 'center'}}>עידכון לקוח</h1><hr/>
            <form onSubmit={handleSubmit(send)}>
            <TextField name="id" label="קוד לקוח" disabled fullWidth value={customer.id}
            {...register("id")}/>
            <span>{errors.id?.message}</span>
            <br/><br/>
            <TextField name="firstName" label="שם פרטי" fullWidth  variant="outlined"
            {...register("firstName",{required:{value:true,message:"חייב להכניס שם"}})}
            value={firstName} onChange={firstNameHandler}/>
            <span>{errors.firstName?.message}</span>
            <br/><br/>
            <TextField name="lastName" label="שם משפחה" fullWidth variant="outlined"
            {...register("lastName",{required:{value:true,message:"חייב למלא שם משפחה"}})}
            value={lastName} onChange={lastNameHandler}/>
            <span>{errors.lastName?.message}</span>
            <br/><br/>
            <TextField name="email" label="אימייל" fullWidth type={"email"} variant="outlined"
            {...register("email",{
                required:{
                    value:true,
                    message:"אימייל חייב להיות  מוכנס ותקני"}})}
                    value={email} onChange={emailHandler}/>
            <span>{errors.email?.message}</span>
            <br/><br/>
            <TextField name="password" label="סיסמא" fullWidth type={"password"} variant="outlined"
            {...register("password",{required:{value:true,message:"חייב להכניס סיסמא"}})}
            value={password} onChange={passwordHandler}/>
            <FormHelperText>חייב להיות לפחות 4 תווים!</FormHelperText>
            <span>{errors.password?.message}</span>
            <br/><br/>
            <Button variant="contained" color="primary" type="submit">עדכן חברה</Button>
            </form>
        </div>
    );
}

export default UpdateCustomer;

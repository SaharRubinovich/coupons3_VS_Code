import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Customer from "../../../../modal/Customer";
import globals from "../../../../util/global";
import jwtAxios from "../../../../util/JWTaxios";
import advNotify from "../../../../util/notify_advanced";
import "./customerRegister.css";

function CustomerRegister(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {register,handleSubmit, formState:{errors}} = useForm<Customer>();


    const emailHandler= (event: { target: { value: string; }; }) => {
        setEmail(event.target.value as string);
    };
    const passwordHandler = (event: { target: { value: string; };}) => {
        setPassword(event.target.value as string);
    };
    const firstNameHandler = (event: { target: { value: string;};}) =>{
        setFirstName(event.target.value as string);
    };
    const lastNameHandler = (event: { target: { value: string;};}) =>{
        setLastName(event.target.value as string);
    };

    const send = (customer: Customer) => {
        //console.log(customer);
        jwtAxios.post(globals.urls.registerCustomer, customer)
        .then(response => {
            advNotify.success("לקוח נוסף למערכת");
        })
        .catch(err => {
            advNotify.error(err.response.data.message + err.response.data.description);
        })
    };
    return (
        <div className="customerRegister">
			<h3>הרשמת לקוח</h3><hr/>
            <form onSubmit={handleSubmit(send)}>
                <TextField name="firstName" label="שם פרטי" {...register("firstName",{required:{value:true, message:""}})} onChange={firstNameHandler}/>
                <span>{errors.firstName?.message}</span>
                <br/><br/>
                <TextField name="lastName" label="שם משפחה" {...register("lastName",{required:{value:true, message:""}})} onChange={lastNameHandler}/>
                <span>{errors.lastName?.message}</span>
                <br/><br/>
                <TextField name="password" label="סיסמא" type={"password"} {...register("password",{required:{value:true, message:""}})} onChange={passwordHandler}/>
                <span>{errors.password?.message}</span>
                <br/><br/>
                <TextField name="email" label="אימייל" type={"email"} {...register("email",{required:{value:true, message:""}})} onChange={emailHandler}/>
                <span>{errors.email?.message}</span>
                <br/><br/>
                <Button variant="contained" color="primary" type="submit">הירשם</Button>
            </form>
        </div>
    );
}

export default CustomerRegister;

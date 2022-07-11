import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Company from "../../../../modal/Company";
import globals from "../../../../util/global";
import jwtAxios from "../../../../util/JWTaxios";
import "./companyRegister.css";
import advNotify from './../../../../util/notify_advanced';

function CompanyRegister(): JSX.Element {
    const {register,handleSubmit, formState:{errors}} = useForm<Company>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailHandler= (event: { target: { value: string; }; }) => {
        setEmail(event.target.value as string);
    };
    const passwordHandler = (event: { target: { value: string; };}) => {
        setPassword(event.target.value as string);
    };
    const nameHandler = (event: { target: { value: string; };}) => {
        setName(event.target.value as string);
    };
    const send = (company: Company) => {
        //console.log(company);
        jwtAxios.post(globals.urls.registerCompany, company)
        .then(response => {
            advNotify.success("חברה נוספה")
        })
        .catch(error =>{
            advNotify.error(error.response.data.message + error.response.data.description);
        })
    };

    return (
        <div className="companyRegister">
            <h3>הרשמה לחברה</h3><hr/>
			<form onSubmit={handleSubmit(send)}>
                <TextField name="name" label="שם חברה" variant="outlined" {...register("name",{required:{value:true, message: "חייב להכניס שם חברה"}})} onChange={nameHandler}/>
                <span>{errors.name?.message}</span>
                <br/><br/>
                <TextField name="email" type={"email"} label="אימייל" variant="outlined" {...register("email",{required:{value:true, message: "נע להכניס מייל תקני"}})} onChange={emailHandler}/>
                <span>{errors.email?.message}</span>
                <br/><br/>
                <TextField name="password" type={"password"} label="סיסמא" variant="outlined" {...register("password",{required:{value:true, message: "נע להכניס סיסמא"}})} onChange={passwordHandler}/>
                <span>{errors.password?.message}</span>
                <br/><br/>
                <Button variant="contained" color="primary" type="submit">הירשם</Button>
            </form>
        </div>
    );
}

export default CompanyRegister;

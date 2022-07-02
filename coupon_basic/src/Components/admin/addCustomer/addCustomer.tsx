import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Customer from "../../../modal/Customer";
import "./addCustomer.css";
import jwtAxios from './../../../util/JWTaxios';
import globals from "../../../util/global";
import advNotify from "../../../util/notify_advanced";
import { store } from "../../../redux/store";
import { addCustomer, downloadCustomer } from "../../../redux/customersState";

function AddCustomer(): JSX.Element {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [validForm, setValid] = useState(false);
       
    const {handleSubmit,formState: { errors },} = useForm<Customer>();

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

    useEffect(() => {
        if(password.length >= 4 && firstName.trim().length > 0 && lastName.trim().length > 0){
            setValid(true);
        } else{
            setValid(false);
        }
    },[password,firstName,lastName])

    const send = (msg:Customer) => {
        msg.email = email;
        msg.firstName = firstName;
        msg.lastName = lastName;
        msg.password = password;
        console.log(msg);

        jwtAxios.post(globals.urls.addCustomer,msg)
        .then(response => {
            console.log(response);
            advNotify.success("לקוח חדש נוסף");
            jwtAxios.get(globals.urls.listCustomers)
            .then(response => {
                if(response.status < 300){
                    store.dispatch(downloadCustomer(response.data));
                }else{
                    advNotify.error("error adding customer");
                }
            })
            .catch(err =>{
                advNotify.error(err.message);
            })
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="addCustomer SolidBox">
			<h1>הוספת לקוח</h1><hr/>
            <form onSubmit={handleSubmit(send)}>
                <TextField id="firstName" label="First Name" type={"text"} fullWidth required variant="outlined" 
                onChange={firstNameHandler}/>
                <br/><br/>
                 <TextField id="lastName" label="Last Name" type={"text"} fullWidth required variant="outlined" 
                onChange={lastNameHandler}/>
                <br/><br/>
                 <TextField id="password" label="Password" type={"password"} fullWidth required variant="outlined" 
                onChange={passwordHandler}/>
                <br/><br/>
                <TextField id="email" label="Email" type={"email"} fullWidth required variant="outlined" 
                onChange={emailHandler}/>
                <br/><br/>
                <Button variant="contained" color="primary" type="submit" disabled={!validForm}>הוסף לקוח</Button>
            </form>
        </div>
    );
}

export default AddCustomer;

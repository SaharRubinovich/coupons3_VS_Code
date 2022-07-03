import "./getCustomer.css";
import { useState } from 'react';
import Customer from "../../../modal/Customer";
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import { ButtonGroup, TextField } from '@mui/material';
import { Button } from '@mui/material';
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import { useEffect } from 'react';
import advNotify from "../../../util/notify_advanced";
import { store } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

function GetCustomer(): JSX.Element {
    const [customer,setCustomer] = useState(new Customer);
    const [userInput,setUserInput] = useState('');
    const [valid,setValid] = useState(false);
    const [display,setDisplay] = useState(false);
    const navigate = useNavigate();

 useEffect(()=> {
  if(store.getState().authState.userType != "ADMIN"){
    advNotify.error("Must be logged in");
    navigate("../login");
  }
 },[])

    const cleanInput = () => {
        setUserInput('');
    };

    const getCustomer = () => {
        if(store.getState().customersState.customers.find(item => item.id.toString() === userInput) != undefined){
            setCustomer(store.getState().customersState.customers.find(item => item.id.toString() === userInput));
        }else{
            advNotify.error("לקוח לא נמצא");
        }
    }
    useEffect(() => {
        setValid(userInput.length>0)
    },[userInput])

    useEffect(() => {
        if (customer.id>0 && valid){
          setDisplay(true);
        } else{
            setDisplay(false);
        }
    },[customer,valid]);

    const userInputHandler = (event: { target: { value: string; }; }) => {
        setUserInput(event.target.value as string)
    };

    return (
        <div className="getCustomer">
            <h3>קבלת לקוח</h3>
            <hr/>
            <TextField id="userInput" label="הכנס מספר לקוח" value={userInput} onChange={userInputHandler} required/><br/><br/>
            <ButtonGroup variant="contained">
                <Button color="primary" onClick={getCustomer} disabled={!valid}>קבל לקוח</Button>
                <Button color="error" onClick={cleanInput}>נקה בחירה</Button>
            </ButtonGroup><br/><br/>
            {display?<div><SingleCustomer key={customer.id} item={customer}/></div>:''}
        </div>
    );
}

export default GetCustomer;

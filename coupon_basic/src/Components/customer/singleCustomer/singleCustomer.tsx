import Customer from "../../../modal/Customer";
import "./singleCustomer.css";
import { Button, ButtonGroup } from '@mui/material';
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { store } from "../../../redux/store";

interface singleCustomerProps{
    item: Customer;
}

function SingleCustomer(props: singleCustomerProps): JSX.Element {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    const deleteCustomerHandler = () => {
       navigate("../admin/deleteCustomer", {replace:true , state:{id: props.item.id}})
    };

    const updateCustomerHandler = () => {
        navigate("/admin/updateCustomer", {state:{id : props.item.id}})
    }

    const showCoupons = () => {
        if (store.getState().authState.userType === "ADMIN") {
            navigate("../admin/customerCoupons",{replace:true,state:{id: props.item.id}})
        } else{
            navigate("..customer/getCustomerCoupons", {replace:true})
        }
    };

    const buttonDisplay = () => {
        return (<>
            <ButtonGroup variant="contained" fullWidth>
                <Button color="secondary" onClick={updateCustomerHandler}>עדכון לקוח</Button>
                <Button variant="contained" color="error" onClick={deleteCustomerHandler}>מחיקת לקוח</Button>
            </ButtonGroup>
        </>)
    };

    useEffect(()=>{
        if(store.getState().authState.userType === "ADMIN"){
            setIsAdmin(true);
        }
    },[])
    return (
        <div className="singleCustomer SolidBox">
			<h2>{props.item.id}</h2>
            <hr/>
            First Name: {props.item.firstName}<br/><br/>
            Last Name: {props.item.lastName}<br/><br/>
            Email: {props.item.email}<br/><br/>
            {isAdmin?buttonDisplay():''}
            <br/>
            <Button color="primary" variant="contained" onClick={showCoupons}>רשימת קופונים</Button>
        </div>
    );
}

export default SingleCustomer;

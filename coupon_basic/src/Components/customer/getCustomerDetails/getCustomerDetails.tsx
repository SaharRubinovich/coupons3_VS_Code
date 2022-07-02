import { useEffect, useState } from "react";
import Customer from "../../../modal/Customer";
import { store } from "../../../redux/store";
import "./getCustomerDetails.css";
import { useNavigate } from 'react-router-dom';
import advNotify from "../../../util/notify_advanced";
import SingleCustomer from "../singleCustomer/singleCustomer";

function GetCustomerDetails(): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(new Customer);

    useEffect(()=>{
        if(store.getState().authState.userType != "CUSTOMER"){
            advNotify.error("Must Be logged in");
            navigate("/login");
        } else{
            setCustomer(store.getState().authState.customer);
        }
    },[])
    return (
        <div className="getCustomerDetails">
			<h1>פרטי לקוח</h1><hr/>
            <SingleCustomer key={customer.id} item={customer}/>
        </div>
    );
}

export default GetCustomerDetails;

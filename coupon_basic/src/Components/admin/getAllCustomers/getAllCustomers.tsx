import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Customer from "../../../modal/Customer";
import { downloadCompanies } from "../../../redux/companyState";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import "./getAllCustomers.css";

function GetAllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const [customers,setCustomers] = useState<Customer[]>([]);
    const reduxCustomers: Customer[] = useSelector((reduxStore:any)=>{
        return reduxStore.customersState.customers
   }) 

   useEffect(() => {
       if(store.getState().authState.userType === "ADMIN"){
      //setCustomers(store.getState().customersState.customers);
    } else{
        advNotify.error("Must be logged in");
        navigate("/login");
    } 
   },[])

    return (
        <div className="getAllCustomers">
			<h1>לקוחות</h1><hr/>
            {reduxCustomers.map(item => <SingleCustomer key={item.id} item={item}/>)}
        </div>
    );
}

export default GetAllCustomers;

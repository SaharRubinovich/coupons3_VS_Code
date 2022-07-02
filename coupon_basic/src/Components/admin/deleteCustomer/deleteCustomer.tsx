import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";
import "./deleteCustomer.css";
import { deleteCustomer } from './../../../redux/customersState';

interface customerId{
    from: {id: number}
}

function DeleteCustomer(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();

    const {id} = location.state as any;

   
    
    return (
        <div className="deleteCustomer">
        </div>
    );
}

export default DeleteCustomer;

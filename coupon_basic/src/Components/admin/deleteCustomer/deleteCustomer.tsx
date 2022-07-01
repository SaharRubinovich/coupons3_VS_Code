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

    useEffect(()=>{
        if(store.getState().authState.userType != "ADMIN"){
            return navigate("login");
        }
        if(id===undefined){
            return navigate("../admin/getAllCustomers", {replace:true});
        }
        jwtAxios.delete(globals.urls.deleteCustomer+id)
        .then(response =>{
            advNotify.success("Customer " + id + " was Deleted!");
            store.dispatch(deleteCustomer(id));
        })
        .catch(err => {
            console.log(err);
        })
        .finally(()=>{
            navigate("../admin/getAllCustomers", {replace:true});
        })
    },[])
    
    return (
        <div className="deleteCustomer">
        </div>
    );
}

export default DeleteCustomer;

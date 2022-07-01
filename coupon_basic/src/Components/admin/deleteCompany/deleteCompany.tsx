import "./deleteCompany.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import advNotify from "../../../util/notify_advanced";
import { store } from "../../../redux/store";
import { deleteCompany } from "../../../redux/companyState";

interface stateType {
    from: { id: number }
}


function DeleteCompany(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();

    const {id} = location.state as any;

    useEffect(()=>{
        if(store.getState().authState.userType != "ADMIN"){
            return navigate("/login");
        }
        if(id===undefined){
            return navigate("../admin/getAllCompanies", {replace:true});
        }
        console.log(globals.urls.deleteCompany+id);
        
        jwtAxios.delete(globals.urls.deleteCompany+id)
        .then(response =>{
            if(response.status < 300){
            advNotify.success("חברה נמחקה!");
            store.dispatch(deleteCompany(id));
            } else {
                advNotify.error("בעיה קרתה במחיקת חברה");
                console.log(response);
            }
        })
        .catch(err => {
            console.log(err);
        })
        
        navigate("../admin/getAllCompanies", {replace:true});
    },[])

    
    return (
        <div className="deleteCompany">
        </div>
    );
}

export default DeleteCompany;

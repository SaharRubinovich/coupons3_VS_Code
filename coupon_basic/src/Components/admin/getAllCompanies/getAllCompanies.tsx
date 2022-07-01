import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Company from "../../../modal/Company";
import { store } from "../../../redux/store";
import "./getAllCompanies.css";
import advNotify from './../../../util/notify_advanced';
import SignleCompany from "../../company/signleCompany/signleCompany";
import { companyState, downloadCompanies } from './../../../redux/companyState';
import globals from "../../../util/global";
//import { useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import jwtAxios from './../../../util/JWTaxios';
import useAuthConfim from './../../../hooks/useAuthConfim';

function GetAllCompanies(): JSX.Element {
       const navigate = useNavigate();
       const [companies,setCompanies] = useState<Company[]>([]);

     useEffect(()=>{
         if(store.getState().authState.userType==="ADMIN"){
         setCompanies(store.getState().companyState.companies);
        } else{
            advNotify.error("Must be logged in");
            navigate("/login");
        }
     },[])

    return (
        <div className="getAllCompanies">
			<h1>חברות</h1><hr/>
            {companies.map(item => <SignleCompany key={item.id} company={item}/>)}
        </div>
    );
}

export default GetAllCompanies;

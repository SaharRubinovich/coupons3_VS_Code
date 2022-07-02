import "./getCompanyDetails.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Company from "../../../modal/Company";
import { store } from "../../../redux/store";
import SignleCompany from "../signleCompany/signleCompany";

function GetCompanyDetails(): JSX.Element {
    const navigate = useNavigate();
    const [company, setCompany] = useState(new Company);

    useEffect(()=>{
        if(store.getState().authState.userType != "COMPANY"){
            navigate("../login", {replace:true});
        }else{
            setCompany(store.getState().authState.company);
        }
    },[])

    return (
        <div className="getCompanyDetails">
			<h1>פרטי חברה</h1><hr/>
            {<SignleCompany company={company}/>}
        </div>
    );
}

export default GetCompanyDetails;

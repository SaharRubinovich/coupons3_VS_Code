import Company from "../../../modal/Company";
import "./signleCompany.css";
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UpdateCompany from "../../admin/updateCompany/updateCompany";
import globals from "../../../util/global";
import { store } from './../../../redux/store';

interface SignleCompanyProps{
    company: Company;
}

function SignleCompany(props: SignleCompanyProps): JSX.Element {
    const navigate = useNavigate();

    const deleteComapnyHandler = () => {
        navigate("/admin/deleteCompany", {state:{id: props.company.id}})
    }

    const showCoupons = () => {
        if (store.getState().authState.userType === "ADMIN"){
            navigate("../admin/companyCoupons",{replace:true, state:{id: props.company.id}})
        } else{
            navigate("../company/getAllCompanyCoupons",{replace:true})
        }
    };

    return (
        <div className="signleCompany SolidBox">
            <h2 style={{textAlign: "center"}}>{props.company.id}</h2>
            <hr/><br/>
            {props.company.email}<br/><br/>
            {props.company.name}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                {/*Will do Something later*/}
                <Button color="error" onClick={() => {
                    navigate("/admin/UpdateCompany", {state:{
                        id: props.company.id}})
                    }}>עדכון חברה</Button>
            <Button variant="contained" onClick={deleteComapnyHandler}>מחיקת חברה</Button>
            </ButtonGroup><br/>
                    <Button color="primary" onClick={showCoupons}>רשימת קופונים</Button>

        </div>
    );
}

export default SignleCompany;

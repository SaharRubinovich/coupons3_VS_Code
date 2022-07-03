import { useLocation, useNavigate } from "react-router-dom";
import "./updateCompany.css";
import Company from './../../../modal/Company';
import { useEffect, useState } from "react";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import { useForm } from "react-hook-form";
import { store } from "../../../redux/store";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { updateCompany } from "../../../redux/companyState";
import advNotify from "../../../util/notify_advanced";
import useAuthConfim from "../../../hooks/useAuthConfim";

interface stateType {
    from: { id: number }
}

function UpdateCompany(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const {register,handleSubmit, formState:{errors}} = useForm<Company>();

    const [company,SetCompany] = useState(new Company())
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {id} = location.state as any;



    const send = (msg:Company) => {
        msg.id = id;
        msg.name = name;
        //console.log(msg);
        
        jwtAxios.put(globals.urls.updateCompany, msg)
        .then(response => {
            if (response.status < 300) {
                store.dispatch(updateCompany(msg))
                advNotify.success("חברה עודכנה בהצלחה!")
            } else{
                advNotify.error(response.data);
            }
        })
        .catch(err => {
            advNotify.error(err.response.data.message + err.response.data.description);
        })
        
    };

    useEffect(()=>{
        if(store.getState().authState.userType != "ADMIN"){
            return navigate("login");
        }
        if(id===undefined){
            return navigate("../getAllCompanies");
        }
       SetCompany(store.getState().companyState.companies.find(item => item.id == id));
    },[])

    useEffect(() => {
        setEmail(company.email);
        setName(company.name);
        setPassword(company.password);
    },[company])

    const emailHandler= (event: { target: { value: string; }; }) => {
        setEmail(event.target.value as string);
    };
    const passwordHandler = (event: { target: { value: string; };}) => {
        setPassword(event.target.value as string);
    };
    return (
        <div className="updateCompany" dir="ltr">
			<h1 style={{textAlign: 'center'}}>עידכון חברה</h1><hr/>
            <form onSubmit={handleSubmit(send)}>
                <TextField name="id" label="קוד חברה" variant="outlined" value={id} disabled
                {...register("id")}/>
                <br/><br/>
                <TextField name="name" label="שם חברה" variant="outlined" value={name} disabled
                {...register("name")}/>
                <br/><br/>
                <TextField name="email" label="אימייל" variant="outlined"  type="email"
                {...register("email",{required:{value:true, message:"חייב להכניס מייל תקני"}})}
                value={email} onChange={emailHandler}/>
                <section>{errors.email?.message}</section>
                <br/><br/>
                <TextField name="password" label="סיסמא" variant="outlined" type="password"
                {...register("password",{required:{value:true, message:"חייב להכניס סיסמא"}})}
                value={password} onChange={passwordHandler}/>
                <FormHelperText>חייב להיות לפחות 4 תווים!</FormHelperText>
                <section>{errors.password?.message}</section>
                <br/><br/>
            <Button variant="contained" color="primary" type="submit">עדכן חברה</Button>
            </form>
        </div>
    );
}

export default UpdateCompany;

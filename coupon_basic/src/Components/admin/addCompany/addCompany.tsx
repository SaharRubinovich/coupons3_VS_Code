import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Company from "../../../modal/Company";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import "./addCompany.css";
import advNotify from './../../../util/notify_advanced';
import { store } from "../../../redux/store";
import { addCompany, downloadCompanies } from "../../../redux/companyState";
import { useNavigate } from "react-router-dom";

function AddCompany(): JSX.Element {
 const [name,setName] = useState('');
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [valid,setValid] = useState(false);
 const navigate = useNavigate();

 useEffect(()=> {
  if(store.getState().authState.userType != "ADMIN"){
    advNotify.error("Must be logged in");
    navigate("../login");
  }
 },[])

 useEffect(()=>{
   if (name !='' && password!='' && email.includes("@")){
     setValid(true);
   } else{
    setValid(false);
   }
 },[name,email,password])
    
  const {handleSubmit,formState: { errors },} = useForm<Company>();
  const send = (newCompany:Company) => {
    newCompany.name = name;
    newCompany.email = email;
    newCompany.password = password;

      jwtAxios.post(globals.urls.addCompany,newCompany)
      .then(response => {
        if(response.status < 300){
        advNotify.success("חברה נוספה!")
        jwtAxios.get(globals.urls.listCompanies)
        .then(response => {
            if(response.status < 300){
                store.dispatch(downloadCompanies(response.data));
            }else{
                advNotify.error("error adding company");
            }
        })
        .catch(err =>{
            advNotify.error(err.response.data.message + err.response.data.description);
        })
        setName('');
        setPassword('');
        setEmail('');
      } else{
        advNotify.error("שגיאה במהלך ההוספה")
      }
      })
      .catch(err => {
        advNotify.error("שגיאה במהלך ההוספה")
      })
  }

  const nameHandler = (event: { target: { value: string; }; }) => {
      setName(event.target.value as string);
  }

  const emailHandler = (event: { target: { value: string; }; }) => {
    setEmail(event.target.value as string);
}

const passwordHandler = (event: { target: { value: string; }; }) => {
    setPassword(event.target.value as string);
}

  return (
    <div className="addCompany SolidBox" dir="ltr">
      <h1>הוספת חברה</h1>
      <hr />
      <form onSubmit={handleSubmit(send)}>
        <TextField id="email" label="Email" variant="outlined" fullWidth type={"email"} 
        onChange={emailHandler} required/>
        <br />
        <br />
        <TextField id="name" label="Name" variant="outlined" fullWidth type={"text"} 
        onChange={nameHandler} required/>
        <br />
        <br />
        <TextField id="password" label="Password" variant="outlined" fullWidth type={"password"} 
        onChange={passwordHandler} required/>
        <br />
        <br />
        <Button type="submit" variant="contained" style={{marginLeft: '70px'}} disabled={!valid}>
          הוספת חברה
        </Button>
      </form>
    </div>
  );
}

export default AddCompany;

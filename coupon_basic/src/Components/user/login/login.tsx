import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";
import { useForm } from "react-hook-form";
import UserCred from "./../../../modal/userCred";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import advNotify from "../../../util/notify_advanced";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
//import { useDispatch } from 'react-redux';
import { downloadCompanies } from "../../../redux/companyState";
import { useState } from "react";
import { userLogin, companyLogin as loginCompany, customerLogin as loginCustomer } from "../../../redux/authState";
import { useDispatch } from "react-redux";
import { downloadCustomer } from "../../../redux/customersState";
import Customer from "../../../modal/Customer";
import Company from "../../../modal/Company";

function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCred>();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  //const dispatch = useDispatch();

  const changeHandler = (event: { target: { value: string } }) => {
    setUserType(event.target.value as string);
  };

  const adminLogin = () => {
    jwtAxios
      .get(globals.urls.listCompanies)
      .then((response) => {
        store.dispatch(downloadCompanies(response.data));
      })
      .catch((err) => {
        advNotify.error(err.response.data.message + err.response.data.description);
      });
    jwtAxios
      .get(globals.urls.listCustomers)
      .then((response) => {
        store.dispatch(downloadCustomer(response.data));
      })
      .catch((err) => {
        advNotify.error(err.response.data.message + err.response.data.description);
      });
    //console.log(store.getState().companyState.company);
    //console.log(store.getState().customersState.customers);
  };

  const companyLogin = () => {
    jwtAxios
      .get<Company>(globals.urls.getCompanyDetails)
      .then((response) => {
          store.dispatch(loginCompany(response.data));
          //console.log(store.getState().authState.company);
      })
      .catch((err) => {
        advNotify.error(err.response.data.message + err.response.data.description);
      });
  };

  const customerLogin = () => {
    jwtAxios
      .get<Customer>(globals.urls.getCustomerDetails)
      .then((response) => {
         // console.log(response.data);
          store.getState().customersState.customer = response.data;
      })
      .catch((err) => {
        advNotify.error(err.response.data.message + err.response.data.description);
      });
  };

  const send = (msg: UserCred) => {
    msg.userType = userType;
    // console.log(msg);

    jwtAxios
      .post(globals.urls.login, msg)
      .then((response) => {
        //console.log(response);
        advNotify.success("Logged in successfully");
        store.dispatch(userLogin(response.headers.authorization));
        
      })
      .then(() => {
        if (store.getState().authState.userType === "ADMIN") {
          adminLogin();
        }
        if (store.getState().authState.userType === "COMPANY") {
          companyLogin();
        }
        if (store.getState().authState.userType === "CUSTOMER") {
          //customerLogin();
          jwtAxios
            .get<Customer>(globals.urls.getCustomerDetails)
            .then((response) => {
                //console.log(response.data);
                store.dispatch(loginCustomer(response.data));
              
            })
            .catch((err) => {
              advNotify.error(err.response.data.message + err.response.data.description);
            });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        advNotify.error(err.response.data.message + err.response.data.description);
      });
    setUserType("");
  };

  return (
    <div className="login SolidBox">
      <Typography variant="h3" className="HeadLine">
        כניסת משתמש
      </Typography>
      <hr />
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          name="userEmail"
          label="מייל"
          variant="outlined"
          fullWidth
          {...register("userEmail", {
            required: {
              value: true,
              message: "יש להקיש מייל תקני",
            },
          })}
        />
        <span>{errors.userEmail?.message}</span>
        <br />
        <br />
        <br />
        <TextField
          name="userPass"
          label="סיסמא"
          type={"password"}
          fullWidth
          variant="outlined"
          className="TextBox"
          {...register("userPass", {
            required: {
              value: true,
              message: "לא הוקשה סיסמא",
            },
          })}
        />
        {errors.userPass && <span>מה עם הסיסמא, באמא שלך</span>}
        <br />
        <br />
        <InputLabel id="type-label" style={{ marginLeft: "90px" }}>
          סוג משתמש
        </InputLabel>
        <Select
          labelId="type-label"
          label="סוג משתמש"
          required
          value={userType}
          onChange={changeHandler}
          style={{ marginLeft: "110px" }}
        >
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="COMPANY">Company</MenuItem>
          <MenuItem value="CUSTOMER">Customer</MenuItem>
        </Select>
        <br />
        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">
            כניסה למערכת
          </Button>
        </ButtonGroup>
        <br />
      </form>
    </div>
  );
}

export default Login;

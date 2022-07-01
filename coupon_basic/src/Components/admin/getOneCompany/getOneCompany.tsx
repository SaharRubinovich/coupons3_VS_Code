import { Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Company from "../../../modal/Company";
import Customer from "../../../modal/Customer";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";
import SignleCompany from "../../company/signleCompany/signleCompany";
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import "./getOneCompany.css";

interface companyId {
  from: { id: number };
}

function GetOneCompany(): JSX.Element {
  const [company, setCompany] = useState(new Company());
  const [userInput, setUserInput] = useState("");
  const [valid, setValid] = useState(false);
  const [display, setDisplay] = useState(false);


  const inputHandler = (event: { target: { value: string } }) => {
    setUserInput(event.target.value as string);
  };

  const clearInput = () => {
    setUserInput("");
  };
  useEffect(() => {
    setValid(userInput != "");
  }, [userInput]);

  useEffect(() => {
    if (company.id > 0 && valid) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [company, valid]);

  const getCompany = () => {
     if (store.getState().companyState.companies.find(item => item.id.toString() === userInput) != undefined){
       setCompany(store.getState().companyState.companies.find(item => item.id.toString() === userInput));
     } else{
       advNotify.error("לא נמצא חברה שתואמת לקוד לקוח");
     }
  };

  return (
    <div className="getOneCompany">
      <div>
        <h1>פרטי חברה</h1>
        <hr />
        <TextField
          label="הכנס קוד לקוח"
          value={userInput}
          required
          onChange={inputHandler}
        ></TextField>
        <br />
        <br />
        <ButtonGroup variant="contained">
          <Button color="primary" onClick={getCompany} disabled={!valid}>קבל חברה</Button>
          <Button color="error" onClick={clearInput}>
            נקה בחירה
          </Button>
        </ButtonGroup>
      </div>
      {display ? <SignleCompany key={company.id} company={company} /> : ""};
    </div>
  );
}

export default GetOneCompany;

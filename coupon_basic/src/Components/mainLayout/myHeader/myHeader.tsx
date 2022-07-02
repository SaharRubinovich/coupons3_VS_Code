import { NavLink } from "react-router-dom";
import "./myHeader.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, BadgeProps, Button, IconButton, styled } from "@mui/material";
import { store } from "../../../redux/store";
import { userLogout } from "./../../../redux/authState";
import { logoutCompany } from "../../../redux/companyState";
import { customerLogout } from "../../../redux/customersState";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyHeader(): JSX.Element {
  const navigate = useNavigate();
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const openCart = () => {
    store.getState().cartState.isOpen = true;
  };
  const [userType, setUserType] = useState("");
  const logout = () => {
    if (store.getState().authState.userType == "CUSTOMER") {
      //store.dispatch(userLogout());
      console.log("hi1")
      store.dispatch(userLogout());
    }
    if (store.getState().authState.userType == "COMPANY") {
      store.dispatch(userLogout());
    }
    if (store.getState().authState.userType == "ADMIN") {
      store.dispatch(userLogout());
    }
    navigate("../");
  };
  const display = () => {
    if (userType == "") {
      return (
        <>
          <NavLink to="/login">כניסה למערכת</NavLink>
        </>
      );
    } else {
      return (
        <>
          <Button variant="outlined" color="primary" onClick={logout}>
            התנתקות
          </Button>
        </>
      );
    }
  };
  useEffect(() => {
    display();
  }, [userType]);
  store.subscribe(() => {
    if (store.getState().authState.userType !== userType) {
      setUserType(store.getState().authState.userType);
    }
  });
  return (
    <div className="myHeader">
      <h1>מערכת פאקינג קופונים</h1>
      <br />
      <div style={{ textAlign: "end", padding: "0px 0px 0px 30px" }}>
        {display()}
      </div>
    </div>
  );
}

export default MyHeader;

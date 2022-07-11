import { NavLink } from "react-router-dom";
import "./myHeader.css";
import {
  AppBar,
  Badge,
  BadgeProps,
  Button,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { store } from "../../../redux/store";
import { userLogout } from "./../../../redux/authState";
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

  const [userType, setUserType] = useState("");
  const login = () => {
    navigate("/login");
  };
  const logout = () => {
    if (store.getState().authState.userType == "CUSTOMER") {
      //store.dispatch(userLogout());
      //console.log("hi1")
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
          <Button
            color="inherit"
            onClick={login}
            style={{ position: "fixed", left: "2%" }}
          >
            התחברות
          </Button>{" "}
        </>
      );
    } else {
      return (
        <>
          <Button
            color="inherit"
            onClick={logout}
            style={{ position: "fixed", left: "2%" }}
          >
            התנתקות
          </Button>
        </>
      );
    }
  };
  const menuDisplay = () => {
    if (userType == "ADMIN") {
      return (
        <div id="userMenu">
          <NavLink to="admin/addCompany" className={"navLinkCss"}>
            הוספת חברה
          </NavLink>
          <NavLink to="admin/addCustomer" className={"navLinkCss"}>
            הוספת לקוח
          </NavLink>
          <NavLink to="admin/getAllCompanies" className={"navLinkCss"}>
            הצגת חברות
          </NavLink>
          <NavLink to="admin/getAllCustomers" className={"navLinkCss"}>
            הצגת לקוחות
          </NavLink>
          <NavLink to="admin/getCustomer" className={"navLinkCss"}>
            קבלת לקוח
          </NavLink>
          <NavLink to="admin/getOneCompany" className={"navLinkCss"}>
            קבלת חברה
          </NavLink>
        </div>
      );
    }
    if (userType == "COMPANY") {
      return (
        <div id="companyMenu">
          <NavLink to="company/addCoupon" className={"navLinkCss"}>הוספת קופון</NavLink>
          <NavLink to="company/getAllCompanyCoupons" className={"navLinkCss"}>רשימת קופונים</NavLink>
          <NavLink to="company/getCompanyDetails" className={"navLinkCss"}>פרטי חברה</NavLink>
          <NavLink to="company/getCouponsByCategory" className={"navLinkCss"}>קופון לפי קטגוריה</NavLink>
          <NavLink to="company/getCouponsByMaxPrice" className={"navLinkCss"}>קופון לפי מחיר</NavLink>
        </div>
      );
    }
    if (userType == "CUSTOMER") {
      return (
        <div id="customerMenu">
          <NavLink to="customer/getCustomerCoupons" className={"navLinkCss"}>רשימת קופונים</NavLink>
          <NavLink to="customer/getCustomerCouponsByCategory" className={"navLinkCss"}>קופונים לפי קטגוריה</NavLink>
          <NavLink to="customer/getCustomerCouponsByMaxPrice" className={"navLinkCss"}>קופונים לפי מחיר</NavLink>
          <NavLink to="customer/getCustomerDetails" className={"navLinkCss"}>פרטי לקוח</NavLink>
        </div>
      );
    } else {
      return <></>;
    }
  };
  useEffect(() => {
    display();
    menuDisplay();
  }, [userType]);
  store.subscribe(() => {
    if (store.getState().authState.userType !== userType) {
      setUserType(store.getState().authState.userType);
    }
  });
  return (
    <div className="myHeader">
      {/**<h1>מערכת פאקינג קופונים</h1>*/}
      <AppBar position="fixed" style={{ display: "flex" }}>
        <Toolbar>
          <Typography
            variant="h4"
            sx={{ flexGrow: 1 }}
            style={{ position: "absolute" }}
          >
            מערכת קופונים
          </Typography>
          {menuDisplay()}
          <NavLink to="/allCoupons" className={"navLinkCss"} style={{left: "7%", position:"fixed"}}>כל הקופונים</NavLink>
          <Button color="inherit">הרשמה</Button>      
          {display()}
        </Toolbar>
      </AppBar>
      <br />
      <div style={{ textAlign: "end", padding: "0px 0px 0px 30px" }}>
        {/*display()*/}
      </div>
    </div>
  );
}

export default MyHeader;

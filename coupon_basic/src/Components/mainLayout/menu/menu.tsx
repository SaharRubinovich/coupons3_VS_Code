import "./menu.css";
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { store } from "../../../redux/store";

function Menu(): JSX.Element {
    const [userType, setUserType] = useState('');

    const adminMenu = ()=>{
        return (
            <>
                מנהל מערכת<br/>
                <NavLink to="admin/addCompany">הוספת חברה</NavLink><br/>
                <NavLink to="admin/addCustomer">הוספת לקוח</NavLink><br/>
                {/**
                <NavLink to="admin/deleteCompany">מחיקת חברה</NavLink><br/>
                <NavLink to="admin/deleteCustomer">מחיקת לקוח</NavLink><br/>
                 */}
                <NavLink to="admin/getAllCompanies">הצגת חברות</NavLink><br/>
                <NavLink to="admin/getAllCustomers">הצגת לקוחות</NavLink><br/>
                <NavLink to="admin/getCustomer">קבלת לקוח</NavLink><br/>
                <NavLink to="admin/getOneCompany">קבלת חברה</NavLink><br/>
                {/**
                <NavLink to="admin/updateCompany">עידכון חברה</NavLink><br/>
                <NavLink to="admin/updateCustomer">עידכון לקוח</NavLink><br/>   
                 */}  
                <br/>
            </>
        );
    };
   
    const companyMenu = ()=>{
        return (
            <>
                תפריט חברה<br/>
                <NavLink to="company/addCoupon">הוספת קופון</NavLink><br/>
                <NavLink to="company/deleteCoupon">מחיקת קופון</NavLink><br/>
                <NavLink to="company/getAllCompanyCoupons">רשימת קופונים</NavLink><br/>
                <NavLink to="company/getCompanyDetails">פרטי חברה</NavLink><br/>
                <NavLink to="company/getCouponsByCategory">קופון לפי קטגוריה</NavLink><br/>
                <NavLink to="company/getCouponsByMaxPrice">קופון לפי מחיר</NavLink><br/>
                {//<NavLink to="company/updateCoupon">עידכון קופון</NavLink><br/>
                }
                <br/>        
            </>
        ); 
    };

    const customerMenu = ()=>{
        return (
            <>
                לקוח<br/>
                <NavLink to="customer/getCustomerCoupons">רשימת קופונים</NavLink><br/>
                <NavLink to="customer/getCustomerCouponsByCategory">קופונים לפי קטגוריה</NavLink><br/>
                <NavLink to="customer/getCustomerCouponsByMaxPrice">קופונים לפי מחיר</NavLink><br/>
                <NavLink to="customer/getCustomerDetails">פרטי לקוח</NavLink><br/>
                {/*<NavLink to="customer/purchaseCoupon">רכישת קופון</NavLink><br/>*/}
            </>
        )
    }

    const display = () => {
        if(store.getState().authState.userType == "ADMIN"){
            return adminMenu();
        }
        if(store.getState().authState.userType == "COMPANY"){
            return companyMenu();
        }
        if(store.getState().authState.userType == "CUSTOMER"){
            return customerMenu();
        }
    };

    useEffect(()=>{
        display();
    },[userType])
    store.subscribe(()=>{
        if(store.getState().authState.userType !== userType){
            setUserType(store.getState().authState.userType);
        }
    })
    return (
        <div className="menu">           
            {display()} <br/>
            <NavLink to="/allCoupons">כל הקופונים</NavLink>       
        </div>
    );
}

export default Menu;

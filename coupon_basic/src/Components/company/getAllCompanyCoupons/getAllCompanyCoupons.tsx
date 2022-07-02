import "./getAllCompanyCoupons.css";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import Coupon from "./../../../modal/Coupon";
import { store } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import SingleCoupon from "./../../user/allCoupons/SingleCoupon/SingleCoupon";
import { couponsState } from './../../../redux/couponsState';
import { authState } from './../../../redux/authState';


function GetAllCompanyCoupons(): JSX.Element {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  let redCoupons = useSelector((selectStore: any) => 
  {
    console.log(5);
    return selectStore.couponsState.coupons.filter((item:Coupon) => item.companyId == selectStore.authState.company.id);
  });
  useEffect(() => {
    if (store.getState().authState.userType === "COMPANY") {
      // setCoupons(store.getState().authState.company.coupons);
    } else {
      navigate("../login", { replace: true });
    }
  }, [coupons]);

  const display = () => {
    return redCoupons.map((item: any) => <SingleCoupon key={item.id} coupon={item} />);
  };
  useEffect(() => {
    display();
  }, [coupons]);
  // store.subscribe(() => {
  //   if (store.getState().authState.company.id != undefined) {
  //     const storeCoupons = store.getState().couponsState.coupons
  //     if(coupons.length !== storeCoupons.length){
  //       setCoupons(storeCoupons);
  //     }
  //   }
  // });
  return (
    <div className="getAllCompanyCoupons">
      <h1>הקופונים של החברה</h1>
      <hr />
      {display()}
    </div>
  );
}

export default GetAllCompanyCoupons;

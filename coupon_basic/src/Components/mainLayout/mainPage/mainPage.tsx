import "./mainPage.css";
import golanPhoto from "../../../assets/golan.jpg"
import { Image, ProgressBar } from "react-bootstrap";
import { useEffect } from "react";
import { store } from "../../../redux/store";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import { DownloadCoupons } from "../../../redux/couponsState";

function MainPage(): JSX.Element {
    
   useEffect(()=>{
       if (store.getState().couponsState.coupons.length < 1){
           jwtAxios.get(globals.urls.getAllCoupons)
           .then(response => {
               store.dispatch(DownloadCoupons(response.data));
               //console.log(store.getState().couponsState.coupons);
           })
           .catch(err => {
               console.log(err);
           })
       }
   },[])
    
    return (
        <div className="mainPage">
			<h2>דף הבית</h2><hr/>
            
        </div>
    );
}

export default MainPage;

import "./mainPage.css";
import welcomeImg from "../../../assets/welcome.png"
import { useEffect } from "react";
import { DownloadCoupons } from "../../../redux/couponsState";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";

function MainPage(): JSX.Element {
    useEffect(()=>{
        if (store.getState().couponsState.coupons.length < 1){
            jwtAxios.get(globals.urls.getAllCoupons)
            .then(response => {
                store.dispatch(DownloadCoupons(response.data));
                //console.log(store.getState().couponsState.coupons);
            })
            .catch(err => {
                //console.log(err);
                advNotify.error(err.response.data.message + err.response.data.description);
            })
        }
    },[])

    return (
        <div className="mainPage">
			<h2>דף הבית</h2><hr/>
            <img src={welcomeImg} width="70%"/>
        </div>
    );
}

export default MainPage;

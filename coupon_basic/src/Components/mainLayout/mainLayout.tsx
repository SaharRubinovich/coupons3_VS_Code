import "./mainLayout.css";
import Menu from "./menu/menu";
import MyHeader from "./myHeader/myHeader";
import MyFooter from "./myFooter/myFooter";
import { BrowserRouter } from "react-router-dom";
import MainPage from './mainPage/mainPage';
import MenuRouting from './../routing/MenuRouting/MenuRouting';
import { useEffect } from "react";
import { DownloadCoupons } from "../../redux/couponsState";
import { store } from "../../redux/store";
import globals from "../../util/global";
import jwtAxios from "../../util/JWTaxios";
import advNotify from "../../util/notify_advanced";


function MainLayout(): JSX.Element {

    return (
        <div id="page-container" className="mainLayout" dir="rtl">
            <BrowserRouter>
                <header>
                    <MyHeader/>
                </header>
                <main id="content-wrap">
                    <MenuRouting/>                
                </main>
                <footer className="footer">
                    <MyFooter/>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default MainLayout;

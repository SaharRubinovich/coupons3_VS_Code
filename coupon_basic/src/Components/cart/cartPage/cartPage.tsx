import { Button, CircularProgress, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Coupon from "../../../modal/Coupon";
import { removeItem } from "../../../redux/cartState";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";
import {clearItems as clearCart} from "../../../redux/cartState";
import { purchaseItem } from "../../../redux/authState";


function CartPage(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isBuying, setIsBuying] = useState(false);
    let cartCoupons: Coupon[] = useSelector((selectStore: any) => {
        return selectStore.cartState.coupons;
    });
    const purchaseHandler = () => {
        setIsBuying(true);
        cartCoupons.map(coupon => {
            jwtAxios.put(globals.urls.purchaseCoupon, coupon)
            .then(response => {
                if (response.status < 300) {
                    setTimeout(()=>{},300)
                    store.dispatch(purchaseItem(coupon));
                    if (cartCoupons.length == 1) {
                        advNotify.success("רכישה בוצעה בהצלחה")
                    }
                    store.dispatch(removeItem(coupon.id));
            }else{
                advNotify.error(response.data.message + response.data.description);
                setIsBuying(false);
            }
        })
        .catch(err => {
            advNotify.error(err.response.data.message + err.response.data.description);
            setIsBuying(false);
        })
        setIsBuying(false);
        })
    };
    const clearItems = () => {
        store.dispatch(clearCart());
    };
    const display = () => {
        return(
            <>
                        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>כותרת</TableCell>
                        <TableCell>תאריך התחלה</TableCell>
                        <TableCell>תאריך סיום</TableCell>
                        <TableCell>מחיר</TableCell>
                        <TableCell>הסרה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartCoupons.map((coupon: Coupon) => (
                        <TableRow>
                            <TableCell>{coupon.title}</TableCell>
                            <TableCell>{coupon.startDate.toLocaleString()}</TableCell>
                            <TableCell>{coupon.endDate.toLocaleString()}</TableCell>
                            <TableCell>{coupon.price}</TableCell>
                            <TableCell><Button variant="contained" color="error" onClick={()=>{
                                store.dispatch(removeItem(coupon.id));
                            }}>הסרה</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer><br/><br/>
        <Button variant="contained" color="success" onClick={purchaseHandler} style={{marginLeft:"10px"}}>רכישה</Button>
        <Button variant="contained" color="error" onClick={clearItems}>הסרת כל הקופונים</Button> 
            </>
        )
    }
    return(
        <div className="cartPage">
            {isBuying ? <CircularProgress/> : display()}
        </div>
    )
}

export default CartPage;
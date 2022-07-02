
import globals from '../util/global';
import jwtAxios from '../util/JWTaxios';
import Coupon from './../modal/Coupon';
import { store } from './store';

export class couponsState{
    coupons: Coupon[] = [];
    numOfCoupons: number;
}

export enum couponsActionType{
    DownloadCoupons = "DownloadCoupons",
    AddCoupon = "AddCoupon",
    UpdateCoupons = "UpdateCoupons",
    DeleteCoupons = "DeleteCoupons"
}

export interface couponsAction{
    type: couponsActionType,
    payload?: any;
}

export function DownloadCoupons(coupons:Coupon[]):couponsAction{
    return{type: couponsActionType.DownloadCoupons, payload: coupons};
}

export function AddCoupon(coupon:Coupon):couponsAction{
    return{type: couponsActionType.AddCoupon ,payload: coupon}
}

export function UpdateCoupon(coupon:Coupon):couponsAction{
    return{type: couponsActionType.UpdateCoupons ,payload: coupon}
}

export function DeleteCoupon(couponId: number):couponsAction{
    return{type: couponsActionType.DeleteCoupons ,payload:couponId}
}

export function couponsReducer(currentState: couponsState = new couponsState, action: couponsAction):couponsState{
    var newState = {...currentState}
    newState.coupons = [...currentState.coupons]

    switch(action.type){
        case couponsActionType.DownloadCoupons:
            newState.coupons = action.payload;
            var lastId = action.payload[action.payload.length -1]
            newState.numOfCoupons = lastId.id;
            break;
        case couponsActionType.AddCoupon:
            jwtAxios.get(globals.urls.getAllCoupons)
            .then(response => {
                store.dispatch(response.data);
            })
            .catch(err => {
                console.log(err);
            })
            break;
        case couponsActionType.UpdateCoupons:
            var updatedCoupons = newState.coupons.filter(item => item.id != action.payload.id);
            newState.coupons = updatedCoupons;
            newState.coupons.push(action.payload);
            break;
        case couponsActionType.DeleteCoupons:
            newState.coupons = newState.coupons.filter(item=>item.id!=action.payload);
            break;
    }
    return newState;
}
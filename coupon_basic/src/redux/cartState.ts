import Coupon from "../modal/Coupon";
import jwtAxios from "../util/JWTaxios";
import advNotify from "../util/notify_advanced";
import globals from './../util/global';
import { store } from "./store";

export class cartState {
  coupons: Coupon[] = [];
  isOpen: boolean = false;
}

export enum cartActionType {
  addItem = "addItem",
  removeItem = "removeItem",
  clearItems = "clearItems",
  toggleCart = "toggleCart"
}

export interface cartAction {
  type: cartActionType;
  payload?: any;
}

export function addItem(coupon: Coupon): cartAction {
  return { type: cartActionType.addItem, payload: coupon };
}
export function removeItem(couponId: Number): cartAction {
  return { type: cartActionType.removeItem, payload: couponId };
}

export function clearItems(): cartAction {
  return { type: cartActionType.clearItems };
}
export function toggleCart(): cartAction {
  return {type: cartActionType.toggleCart};
}

export function cartReducer(
  currentState: cartState = new cartState(),
  action: cartAction
): cartState {
  var newState = { ...currentState };

  switch (action.type) {
    case cartActionType.addItem:
        newState.coupons.push(action.payload);
      break;
    case cartActionType.removeItem:
        newState.coupons = newState.coupons.filter(item => item.id != action.payload);
      break;
    case cartActionType.clearItems:
        newState.coupons = null;
      break;
    case cartActionType.toggleCart:
      newState.isOpen = !newState.isOpen;
      break;
  }
  return newState;
}

import Customer from "../modal/Customer";
import globals from "../util/global";
import jwtAxios from "../util/JWTaxios";
import advNotify from "../util/notify_advanced";
import { store } from "./store";
import authState, { userLogout } from './authState';

export class customersState{
    customers: Customer[];
    numOfCustomers: number;
    customer: Customer;
}

export enum customersActionType{
    DownloadCustomer = "DownloadCustomer",
    AddCustomer = "AddCustomer",
    UpdateCustomer = "UpdateCustomer",
    DeleteCustomer = "DeleteCustomer",
    CustomerLogout = "CustomerLogout"
}

export interface customersAction{
     type: customersActionType,
     payload?:any; 
}

export function downloadCustomer(customers: Customer[]):customersAction{
    return {type: customersActionType.DownloadCustomer , payload: customers};
}

export function addCustomer(customer: Customer):customersAction{
    return {type: customersActionType.AddCustomer , payload: customer};
}

export function updateCustomer(customer: Customer):customersAction{
    return {type: customersActionType.UpdateCustomer , payload: customer};
}

export function deleteCustomer(customerId: number):customersAction{
    return {type: customersActionType.DeleteCustomer, payload:customerId};
}
export function customerLogout():customersAction{
    console.log("hi2");
    return {type: customersActionType.CustomerLogout};
}

export function customerReducer(currentState: customersState = new customersState, action: customersAction):customersState{
    var newState = {...currentState}
    if("customers" in newState && newState.customers){
        newState.customers = [...newState.customers]}
    switch (action.type){
        case customersActionType.DownloadCustomer:
            newState.customers = action.payload;
            var lastId = action.payload[action.payload.length - 1];
            newState.numOfCustomers = lastId + 1;
        break;
       
        case customersActionType.AddCustomer:
            //action.payload.id = newState.numOfCustomers;
            //newState.numOfCustomers += 1;
            //newState.customers.push(action.payload);
           
        break;
       
        case customersActionType.UpdateCustomer:
            var updatedCustomers = newState.customers.filter(item => item.id != action.payload.id);
            updatedCustomers.push(action.payload);
            newState.customers = updatedCustomers;
        break;
        
        case customersActionType.DeleteCustomer:
            newState.customers = newState.customers.filter(item => item.id != action.payload);
        break;
        case customersActionType.CustomerLogout:
            console.log("hi");
            store.dispatch(userLogout());
            //newState.customer.coupons = [];
            //newState.customer.email = "";
            //newState.customer.firstName = '';
            //newState.customer.lastName = '';
            //newState.customer.password = '';
            break;
    }
    return newState;
}

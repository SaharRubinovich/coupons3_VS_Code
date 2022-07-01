import Customer from "../modal/Customer";
import globals from "../util/global";
import jwtAxios from "../util/JWTaxios";
import advNotify from "../util/notify_advanced";
import { store } from "./store";
import { userLogout } from './authState';

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
export function CustomerLogout():customersAction{
    return {type: customersActionType.CustomerLogout};
}

export function customerReducer(currentState: customersState = new customersState, action: customersAction):customersState{
    var newState = {...currentState}

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
            jwtAxios.get(globals.urls.listCustomers)
            .then(response => {
                if(response.status < 300){
                    store.dispatch(downloadCustomer(response.data));
                }else{
                    advNotify.error("error adding customer");
                }
            })
            .catch(err =>{
                advNotify.error(err.message);
            })
        break;
       
        case customersActionType.UpdateCustomer:
            var updatedCustomers = newState.customers.filter(item => item.id != action.payload.id);
            updatedCustomers.push(action.payload);
            newState.customers = updatedCustomers;
        break;
        
        case customersActionType.DeleteCustomer:
            newState.customers = newState.customers.filter(item => item.id != action.payload.id);
        break;
        case customersActionType.CustomerLogout:
            store.dispatch(userLogout());
            newState.customer = null;
            break;
    }
    return newState;
}

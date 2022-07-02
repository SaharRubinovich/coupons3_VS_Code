
import jwt_decode  from 'jwt-decode';
import Company from '../modal/Company';
import Customer from '../modal/Customer';


export class authState{
    userName  : string = "";
    userType  : string = "";
    userToken : string = "";
    userId: string = "";
    company?: Company;
    customer?: Customer;
}

export enum authActionType{
    UserLogin = "UserLogin",
    UserLogout = "UserLogout",
    UpdateToken = "UpdateToken",
    CustomerLogin = "CustomerLogin",
    CompanyLogin = "CompanyLogin"
}

export interface authAction{
    type: authActionType,
    payload?: any;
}

export function userLogin(userToken:string):authAction{
    return {type: authActionType.UserLogin, payload: userToken};
}

export function userLogout():authAction{
    return {type: authActionType.UserLogout};
}


export function updateToken(userToken:string):authAction{
    return {type: authActionType.UpdateToken, payload:userToken};
}

export function companyLogin(company:Company):authAction{
    return {type: authActionType.CompanyLogin, payload:company}
}

export function customerLogin(customer:Customer):authAction{
    return {type: authActionType.CustomerLogin, payload:customer}
}
//reducer :)
export function authReducer(currentState: authState = new authState, action:authAction):authState{
    const newState = {...currentState};

    switch(action.type){
        case authActionType.UserLogin:        
            var myToken = action.payload.replace("Bearer ","");       
            var decoded = JSON.parse(JSON.stringify(jwt_decode(myToken)));
            newState.userName=decoded.sub;
            newState.userType=decoded.userType;
            newState.userToken = action.payload;
            newState.userId = decoded.id;
            //localStorage.setItem("jwt",action.payload);
        break;

        case authActionType.UserLogout:
            if(newState.userType == "COMPANY"){
                newState.company = undefined;
            }
            if(newState.userType == "CUSTOMER"){
                newState.customer = undefined;
            }
            newState.userToken = "";
            newState.userName = "";
            newState.userType = "";
            //localStorage.removeItem("jwt");
        break;

        case authActionType.UpdateToken:
            newState.userToken = action.payload;
            //localStorage.setItem("jwt",action.payload);
        break;
        case authActionType.CompanyLogin:
            newState.company = action.payload;
            break;
        case authActionType.CustomerLogin:
            newState.customer = action.payload;

            break;
    }

    return newState;
}

export default authState;
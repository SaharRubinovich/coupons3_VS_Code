import { authAction, userLogin, userLogout } from './authState';
import jwtAxios from './../util/JWTaxios';
import globals from './../util/global';
import advNotify from './../util/notify_advanced';
import { store } from './store';
import Company from '../modal/Company';

export class companyState{
    companies:Company[] = [];
    numOfCompanies: number;
    company:Company;
}

export enum companyActionType{
    DownloadCompanies = "DownloadCompanies",
    DeleteCompany = "DeleteCompany",
    UpdateCompany = "UpdateCompany",
    AddCompany = "AddCompany",
    CompanyLogOut = "CompanyLogOut",
    CompanyLogin = "CompanyLogin"
}

export interface companyAction{
    type: companyActionType,
    payload?:any;
}

export function downloadCompanies(companies:Company[]):companyAction{
    return {type: companyActionType.DownloadCompanies, payload:companies}
}

export function deleteCompany(companyID:number):companyAction{
    return {type: companyActionType.DeleteCompany, payload:companyID}
}

export function updateCompany(company:Company):companyAction{
    return {type: companyActionType.UpdateCompany, payload: company}
}

export function addCompany(company:Company):companyAction{
    return {type: companyActionType.AddCompany, payload:company}
}
export function logoutCompany():companyAction{
    return {type: companyActionType.CompanyLogOut}
}

export function loginCompany(company: Company):companyAction { 
    return { type: companyActionType.CompanyLogin, payload: company}
}

export function companyReducer(currentState: companyState = new companyState, action: companyAction):companyState{
    var newState = {...currentState}; 

    switch(action.type){
        case companyActionType.DownloadCompanies:
            newState.companies = action.payload;
            var lastCompany = action.payload[action.payload.length - 1];
            newState.numOfCompanies= lastCompany.id + 1;
        break;

        case companyActionType.AddCompany:
            //action.payload.id = newState.numOfCompanies;
            //newState.numOfCompanies += 1;
            //newState.company.push(action.payload);          
            jwtAxios.get(globals.urls.listCompanies)
            .then(response => {
                if(response.status < 300){
                    store.dispatch(downloadCompanies(response.data));
                }else{
                    advNotify.error("error adding company");
                }
            })
            .catch(err =>{
                advNotify.error(err.message);
            })
        break;

        case companyActionType.DeleteCompany:
            newState.companies = newState.companies.filter(item=>item.id!=action.payload);
        break;

        case companyActionType.UpdateCompany:
            var updatedCompanies = newState.companies.filter(item=>item.id!=action.payload.id);
            updatedCompanies.push(action.payload);
            newState.companies = updatedCompanies;
        break;
        case companyActionType.CompanyLogOut:
            store.dispatch(userLogout())
            newState.company = null;
            break;
        case companyActionType.CompanyLogin:
            // store.dispatch(userLogin()) // not needed as it happens on logout
            newState.company = action.payload;
    }
    return newState;
}
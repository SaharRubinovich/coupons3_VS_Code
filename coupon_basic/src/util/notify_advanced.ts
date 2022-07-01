import {Notyf} from "notyf"

export enum SccMsg{
    LOGIN_APPROVED = "Hello my master of pupets",
    COMPANY_ADD = "A new company was added sucsefully",
}

export enum ErrMsg{
    LOGIN_ERR = "Bad user name or password (are you yoav?)",
    COMPANY_EXISTS = "There is a company with that email",
}

class Notify_Advenced{
    private notification = new Notyf({duration:4000,position:{x:"center",y:"center"}});
    public success(message:string){
        this.notification.success(message);
    }

    public error(err:any){
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err:any):string{
        if (typeof err === 'string'){
            return err;
        };
        if (typeof err?.response?.data === 'string'){ //backend exact error
            return err.response.data;
        }
        if (Array.isArray(err?.response?.data)){ //backend exact error
            return err?.response?.data[0];
        }
        //must be last
        if (typeof err?.message === 'string'){
            return err?.message;
        }

        return "Huston we have a problem !!!";
    }
}

const advNotify = new Notify_Advenced();
export default advNotify;
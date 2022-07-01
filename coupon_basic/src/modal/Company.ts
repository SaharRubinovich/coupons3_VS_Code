import Coupon from "./Coupon";

class Company{
    id?: number;
    name: string;
    email: string;
    password: string;
    coupons?: Coupon[];
}

export default Company;
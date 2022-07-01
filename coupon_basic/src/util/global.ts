class Globals{

}

class DevelopmentGlobals extends Globals{
    public urls = {
        /* Admin Links */
        login: "http://localhost:8080/login",
        addCompany: "http://localhost:8080/admin/addCompany",
        addCustomer: "http://localhost:8080/admin/addCustomer",
        listCompanies: "http://localhost:8080/admin/getAllCompanies",
        listCustomers: "http://localhost:8080/admin/getAllCustomers",
        deleteCompany: "http://localhost:8080/admin/deleteCompany/",
        deleteCustomer: "http://localhost:8080/admin/deleteCustomer/",
        getCustomer: "http://localhost:8080/admin//getCustomer?customerId=",
        updateCompany: "http://localhost:8080/admin/updateCompany",
        getCompany: "http://localhost:8080/admin/getOneCompany?companyId=",
        UpdateCustomer: "http://localhost:8080/admin/updateCustomer",
        adminGetCompanyCoupons: "http://localhost:8080/admin/customerCoupons",
        adminGetCustomerCoupons: "http://localhost:8080/admin/companyCoupons",

        /* Company Links */
        addCoupon: "http://localhost:8080/company/addCoupon",
        deleteCoupon: "http://localhost:8080/company/deleteCoupon/",
        getAllCompanyCoupons: "http://localhost:8080/company/getAllCompanyCoupons",
        getCompanyDetails: "http://localhost:8080/company/getCompanyDetails",
        getCouponsByCategory: "http://localhost:8080/company/getCouponsByCategory?category=",
        getCouponsByPrice: "http://localhost:8080/company/getCouponsByMaxPrice?maxPrice=",
        updateCoupon: "http://localhost:8080/company/updateCoupon",

        /* Customer Links */
        getCustomerCoupons: "http://localhost:8080/customer/getCustomerCoupons",
        getCouponByCategory: "http://localhost:8080/customer/getCustomerCouponsByCategory?category=",
        getCouponByPrice: "http://localhost:8080/customer/getCustomerCouponsByMoney/",
        getCustomerDetails: "http://localhost:8080/customer/getCustomerDetails",
        purchaseCoupon: "http://localhost:8080/customer/purchaseCoupon",

        /* Guest Links */
        getAllCoupons: "http://localhost:8080/coupons/allCoupons"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        login: "/login",
        addCompany: "/addCompany",
        addCustomer: "/addCustomer",
        listCompanies: "/getAllCompanies",
        listCustomers: "/getAllCustomers",
        deleteCompany: "/deleteCompany",
        deleteCustomer: "/deleteCustomer",
        getCustomer: "/getCustomer",
        getCompany: "/getCompany",
        updateCompany: "/updateCompany",
        UpdateCustomer: "/updateCustomer",
        adminGetCompanyCoupons: "/admin/customerCoupons",
        adminGetCustomerCoupons: "/admin/companyCoupons",

        /* Company Links */
        addCoupon: "/addCoupon",
        deleteCoupon: "/deleteCoupon/",
        getAllCompanyCoupons: "/getAllCompanyCoupons",
        getCompanyDetails: "/getCompanyDetails",
        getCouponsByCategory: "/getCouponsByCategory?category=",
        getCouponsByPrice: "/getCouponsByMaxPrice?maxPrice=",
        updateCoupon: "/updateCoupon",

        /* Customer Links */
        getCustomerCoupons: "/getCustomerCoupons",
        getCouponByCategory: "/getCustomerCouponsByCategory",
        getCouponByPrice: "/getCustomerCouponsByMoney",
        getCustomerDetails: "/getCustomerDetails",
        purchaseCoupon: "customer/purchaseCoupon",

        /* Guest Links */
        getAllCoupons: "/allCoupons"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals :  new DevelopmentGlobals;
export default globals;
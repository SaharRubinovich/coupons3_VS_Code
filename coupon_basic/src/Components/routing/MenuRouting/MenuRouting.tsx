import { Route, Routes } from "react-router-dom";
import AddCompany from "../../admin/addCompany/addCompany";
import AddCustomer from "../../admin/addCustomer/addCustomer";
import DeleteCompany from "../../admin/deleteCompany/deleteCompany";
import GetAllCustomers from "../../admin/getAllCustomers/getAllCustomers";
import MainPage from "../../mainLayout/mainPage/mainPage";
import "./MenuRouting.css";
import GetAllCompanies from './../../admin/getAllCompanies/getAllCompanies';
import GetCustomer from "../../admin/getCustomer/getCustomer";
import GetOneCompany from "../../admin/getOneCompany/getOneCompany";
import UpdateCompany from "../../admin/updateCompany/updateCompany";
import DeleteCustomer from "../../admin/deleteCustomer/deleteCustomer";
import UpdateCustomer from "../../admin/updateCustomer/updateCustomer";
import Page404 from "../../user/page404/page404";
import AddCoupon from "../../company/addCoupon/addCoupon";
import DeleteCoupon from './../../company/deleteCoupon/deleteCoupon';
import GetAllCompanyCoupons from "../../company/getAllCompanyCoupons/getAllCompanyCoupons";
import GetCompanyDetails from "../../company/getCompanyDetails/getCompanyDetails";
import GetCouponByCategory from './../../company/getCouponByCategory/getCouponByCategory';
import GetCouponsByMaxPrice from "../../company/getCouponsByMaxPrice/getCouponsByMaxPrice";
import UpdateCoupon from "../../company/updateCoupon/updateCoupon";
import GetCustomerCoupons from "../../customer/getCustomerCoupons/getCustomerCoupons";
import GetCustomerCouponsByCategory from "../../customer/getCustomerCouponsByCategory/getCustomerCouponsByCategory";
import GetCustomerCouponsByMoney from "../../customer/getCustomerCouponsByMoney/getCustomerCouponsByMoney";
import GetCustomerDetails from "../../customer/getCustomerDetails/getCustomerDetails";
import PurchaseCoupon from "../../customer/purchaseCoupon/purchaseCoupon";
import Login from "../../user/login/login";
import AllCoupons from "../../user/allCoupons/allCoupons";
import CustomerCoupons from "../../user/allCoupons/customerCoupons/customerCoupons";
import CompanyCoupons from "../../user/allCoupons/companyCoupons/companyCoupons";

function MenuRouting(): JSX.Element {
    return (
        <div className="MenuRouting">
			<Routes>
                {/* admin */}
                <Route path="/" element={<MainPage/>}/>
                <Route path="admin/addCompany" element={<AddCompany/>}/>
                <Route path="admin/addCustomer" element={<AddCustomer/>}/>
                <Route path="admin/deleteCompany" element={<DeleteCompany/>}/>
                <Route path="admin/deleteCustomer" element={<DeleteCustomer/>}/>
                <Route path="admin/getAllCompanies" element={<GetAllCompanies/>}/>
                <Route path="admin/getAllCustomers" element={<GetAllCustomers/>}/>
                <Route path="admin/getCustomer" element={<GetCustomer/>}/>
                <Route path="admin/getOneCompany" element={<GetOneCompany/>}/>
                <Route path="admin/updateCompany" element={<UpdateCompany/>}/>
                <Route path="admin/updateCustomer" element={<UpdateCustomer/>}/>
                <Route path="admin/customerCoupons" element={<CustomerCoupons/>}/>
                <Route path="admin/companyCoupons" element={<CompanyCoupons/>}/>

                {/* company */}
                <Route path="company/addCoupon" element={<AddCoupon/>}/>
                <Route path="company/deleteCoupon" element={<DeleteCoupon/>}/>
                <Route path="company/getAllCompanyCoupons" element={<GetAllCompanyCoupons/>}/>
                <Route path="company/getCompanyDetails" element={<GetCompanyDetails/>}/>
                <Route path="company/getCouponsByCategory" element={<GetCouponByCategory/>}/>
                <Route path="company/getCouponsByMaxPrice" element={<GetCouponsByMaxPrice/>}/>
                <Route path="company/updateCoupon" element={<UpdateCoupon/>}/>

                {/* Customer */}
                <Route path="customer/getCustomerCoupons" element={<GetCustomerCoupons/>}/>
                <Route path="customer/getCustomerCouponsByCategory" element={<GetCustomerCouponsByCategory/>}/>
                <Route path="customer/getCustomerCouponsByMaxPrice" element={<GetCustomerCouponsByMoney/>}/>
                <Route path="customer/getCustomerDetails" element={<GetCustomerDetails/>}/>
                <Route path="customer/purchaseCoupon" element={<PurchaseCoupon/>}/>

                {/* General */}
                <Route path="login" element={<Login/>}/>
                <Route path="guest" element={<MainPage/>}/>
                <Route path="allCoupons" element={<AllCoupons/>}/>

                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default MenuRouting;

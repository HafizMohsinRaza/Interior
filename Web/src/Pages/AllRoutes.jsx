import React , {lazy} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginRegister from "./LoginRegister";
import Freelancers from "./Freelancers";
import SingleFreelancer from "./SingleFreelancer";
import OwnerRegister from "./OwnerRegister";
import ProfessionalAccount from "./ProfessionalAccount";
import Ebid from "./Ebid";
import SingleEbid from "./SingleEbid";
import PostEbid from "./PostEbid";
import SingleOwnerPost from "./SingleOwnerPost";
import BeforeAfterPost from "./BeforeAfterPost";
import Professionals from "./Professionals";
import Wishbook from "./Wishbook";
import SavedPhotos from "./SavedPhotos";
import UserEbid from "./UserEbid";
import SavedProfessionals from "./SavedProfessionals";
import SavedFreelancers from "./SavedFreelancers";
import UserProfile from "./UserProfile";
import RoleLogin from "./RoleLogin";
import ProfessionalProject from "./ProfessionalProject";
import PrivateRoute from "../Components/PrivateRoute";
import UserNotification from "./UserNotification";
import SingleProfessional from "./SingleProfessional";
import OwnerAccount from "./OwnerAccount";
import FreelancerAccount from "./FreelancerAccount";
import FreelancerProject from "./FreelancerProject";
import PrivateRoute2 from "../Components/PrivateRoute2";
import UserLogin from "./UserLogin";
import ForgotPassword from "./ForgotPassword";
import PasswordReset from "./PasswordReset";
import OwnerPasswordReset from "./OwnerPasswordReset";
import OwnerForgotPassword from "./OwnerForgotPassword";
import AllOwnerProjectImages from "./AllOwnerProjectImages";
import AllBeforeAfterImages from "./AllBeforeAfterImages";
import OwnerBid from "./OwnerBid";
import OwnerOtp from "./OwnerOtp";
import UserOtp from "./UserOtp";
import ProfessionalLeads from "./ProfessionalLeads";
import AboutUs from "./SubPages/AboutUs";
import Faq from "./SubPages/Faq";
import TermsConditions from "./SubPages/TermsConditions";
import PrivacyPolicy from "./SubPages/PrivacyPolicy";
import ContactUs from "./SubPages/ContactUs";
import CopyRightPolicy from "./SubPages/CopyRightPolicy";

const AllRoutes = ({ search }) => {
  return (
    <Routes>
      <Route path="/" element={<Home search={search} />} />
      <Route path="/login-register" element={<LoginRegister />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user/otp" element={<UserOtp />} />
      <Route path="/freelancers" element={<Freelancers />} />
      <Route path="/freelancer/:id" element={<SingleFreelancer />} />
      <Route path="/owner" element={<OwnerRegister />} />
      <Route path="/professionals" element={<Professionals />} />
      <Route path="/professionals/:id" element={<SingleProfessional />} />
      <Route path="/e-bid" element={<Ebid />} />
      <Route path="/e-bid/:id" element={<SingleEbid />} />
      <Route
        path="/postebid"
        element={
          <PrivateRoute>
            <PostEbid />
          </PrivateRoute>
        }
      />
      <Route path="/singleownerpost/:id" element={<SingleOwnerPost />} />
      <Route path="/beforeafter/:id" element={<BeforeAfterPost />} />
      <Route
        path="/wishbook"
        element={
          <PrivateRoute>
            <Wishbook />
          </PrivateRoute>
        }
      />
      <Route path="/savedphotos" element={<SavedPhotos />} />
      <Route path="/userebid" element={<UserEbid />} />
      <Route path="/savedprofessional" element={<SavedProfessionals />} />
      <Route path="/savedfreelancer" element={<SavedFreelancers />} />
      <Route
        path="/userprofile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route path="/rolelogin" element={<RoleLogin />} />
      <Route path="/owner/otp" element={<OwnerOtp />} />
      <Route
        path="/owner-account"
        element={
          <PrivateRoute2>
            <OwnerAccount />
          </PrivateRoute2>
        }
      />
      <Route path="/profAccount" element={<ProfessionalAccount />} />
      <Route path="/freelAccount" element={<FreelancerAccount />} />
      <Route path="/profProjects" element={<ProfessionalProject />} />
      <Route path="/leads" element={<ProfessionalLeads/>} />
      <Route path="/freelProjects" element={<FreelancerProject />} />
      <Route path="/notification" element={<UserNotification />} />
      <Route path="/resetPassword" element={<PasswordReset />} />
      <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
      <Route path="/resetPasswordOnwer" element={<OwnerPasswordReset />} />
      <Route
        path="/ownerforgotpassword/:id/:token"
        element={<OwnerForgotPassword />}
      />
      <Route
        path="/allownerprojectimages"
        element={<AllOwnerProjectImages />}
      />
      <Route path="/allbeforeafterimages" element={<AllBeforeAfterImages />} />
      <Route path="/ownercommentbids" element={<OwnerBid />} />
      <Route path="/aboutUs" element={<AboutUs/>} />
      <Route path="/faq" element={<Faq/>} />
      <Route path="/termsConditions" element={<TermsConditions/>} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
      <Route path="/contactUs" element={<ContactUs/>} />
      <Route path="/copyRight" element={<CopyRightPolicy/>} />
    </Routes>
  );
};

export default AllRoutes;

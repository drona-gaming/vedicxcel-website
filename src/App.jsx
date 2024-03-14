import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WhyUsPage from "./Pages/WhyUsPage";
import ContactUs from "./Pages/ContactUs";
import CustomHelmet from "./components/CustomHelmet";
import TermsAndServices from "./Pages/TermsService";
import PartnerLogin from "./Pages/PartnerLogin";
import ReportPage from "./Pages/ReportPage";

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <CustomHelmet
              pageTitle="Home Page"
              pageUrl="https://www.vedicxcel.com"
              pageLogo="https://firebasestorage.googleapis.com/v0/b/vedicxcel.appspot.com/o/logo_native.png?alt=media&token=1a7d59a0-e54d-4997-b1d7-b05b88a88afa"
              pageDescription="Your Partner in Software Development - Providing Innovative Solutions"
            />
            <HomePage />
          </div>
        }
      />
      <Route
        path="/whyUs"
        element={
          <div>
            <CustomHelmet
              pageTitle="Why Us Page"
              pageUrl="https://www.vedicxcel.com/whyUs"
              pageLogo="https://firebasestorage.googleapis.com/v0/b/vedicxcel.appspot.com/o/logo_native.png?alt=media&token=1a7d59a0-e54d-4997-b1d7-b05b88a88afa"
              pageDescription="Your Partner in Software Development - Providing Innovative Solutions"
            />
            <WhyUsPage />
          </div>
        }
      />
      <Route
        path="/ContactUs"
        element={
          <div>
            <CustomHelmet
              pageTitle="Why Us Page"
              pageUrl="https://www.vedicxcel.com/ContactUs"
              pageLogo="https://firebasestorage.googleapis.com/v0/b/vedicxcel.appspot.com/o/logo_native.png?alt=media&token=1a7d59a0-e54d-4997-b1d7-b05b88a88afa"
              pageDescription="Your Partner in Software Development - Providing Innovative Solutions"
            />
            <ContactUs />
          </div>
        }
      />
      <Route
        path="/terms"
        element={
          <div>
            <CustomHelmet
              pageTitle="Terms Page"
              pageUrl="https://www.vedicxcel.com/terms"
              pageLogo="https://firebasestorage.googleapis.com/v0/b/vedicxcel.appspot.com/o/logo_native.png?alt=media&token=1a7d59a0-e54d-4997-b1d7-b05b88a88afa"
              pageDescription="Your Partner in Software Development - Providing Innovative Solutions"
            />
            <TermsAndServices />
          </div>
        }
      />
      <Route
        path="/partnerLogin"
        element={
          <div>
            <CustomHelmet
              pageTitle="Partner Login Page"
              pageUrl="https://www.vedicxcel.com/partnerLogin"
              pageLogo="https://firebasestorage.googleapis.com/v0/b/vedicxcel.appspot.com/o/logo_native.png?alt=media&token=1a7d59a0-e54d-4997-b1d7-b05b88a88afa"
              pageDescription="Your Partner in Software Development - Providing Innovative Solutions"
            />
            <PartnerLogin />
          </div>
        }
      />
      <Route
        path="/partnerLogin/Report"
        element={
          <div>
            <CustomHelmet
              pageTitle="Partner Report Page"
              pageUrl="https://www.vedicxcel.com/partnerLogin/Report"
              pageLogo="https://firebasestorage.googleapis.com/v0/b/vedicxcel.appspot.com/o/logo_native.png?alt=media&token=1a7d59a0-e54d-4997-b1d7-b05b88a88afa"
              pageDescription="Your Partner in Software Development - Providing Innovative Solutions"
            />
            <ReportPage />
          </div>
        }
      />
      {/* Add more routes for other pages */}
    </Routes>
  </Router>
);

export default App;
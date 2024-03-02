import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WhyUsPage from "./Pages/WhyUsPage";
import CustomHelmet from "./components/CustomHelmet";

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
      {/* Add more routes for other pages */}
    </Routes>
  </Router>
);

export default App;
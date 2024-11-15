import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromFirebase } from "../firebase";
import styles from "../style";
import { Footer, Navbar } from "../components";

const PartnerLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase((jsonData) => {
      setData(jsonData.login || []);
    });

    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const encodedUsername = btoa(formData.username);
      const encodedPassword = btoa(formData.password);

      const userExists = data.some(
        (user) =>
          user.username === encodedUsername && user.password === encodedPassword
      );

      if (userExists) {
        const obj = {
          value: "true",
          expires: new Date().setDate(new Date().getDate() + 1).toString(),
        };
        localStorage.setItem("emailSent", JSON.stringify(obj));
        navigate("/partnerLogin/Report");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden min-h-screen">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="w-full text-center mb-16 mt-10">
            <h1 className="font-poppins font-semibold text-[40px] xs:text-[48px] sm:text-[60px] text-white leading-[1.2] mb-4">
              Partner <span className="text-gradient">Login</span>
            </h1>
            <p className={`${styles.paragraph} max-w-[600px] mx-auto`}>
              Access your partner dashboard to manage your account and view
              reports.
            </p>
          </div>

          <form onSubmit={handleLogin} className="max-w-[500px] mx-auto mb-20">
            <div className="bg-black-gradient-2 rounded-[20px] p-8 md:p-12">
              <div className="space-y-6">
                <div className="form-group">
                  <label className="text-white mb-2 block font-poppins">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-primary border border-dimWhite rounded-lg p-4 text-white font-poppins"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label className="text-white mb-2 block font-poppins">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-primary border border-dimWhite rounded-lg p-4 text-white font-poppins"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-center font-poppins text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-gradient text-primary font-poppins font-semibold py-4 px-8 rounded-[10px] transition-all hover:opacity-90 disabled:opacity-70"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Gradient Effects */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient opacity-30" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 opacity-20" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient opacity-30" />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
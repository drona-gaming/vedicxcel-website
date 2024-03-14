import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromFirebase } from "../firebase";
import styles from "../style";

const PartnerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call your login function from the authentication service
      // await login(username, password);
      // If successful, you can redirect the user or perform other actions
      if (!username.trim() || !password.trim()) {
        setError("Username and password are required");
        return;
      }

      const _username = btoa(username);
      const _password = btoa(password);

      console.log(username);
      console.log(password);

      console.log(_username);
      console.log(_password);

      const exists =
        data.filter(
          (user) =>
            user.username.includes(_username) &&
            user.password.includes(_password)
        )?.length > 0;
      console.log(exists);
      if (exists) {
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
      // Handle login errors
      setError("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    //Check if the user has already sent an email on page load
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.login);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="Dark-Gradient partner-body min-h-screen overflow-hidden">
      <div className="login-form">
        <h2 className={`header-title ${styles.heading4}`}>Login</h2>
        <div>
          <FormInput
            description="Username"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            description="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="button" className="row">
            <button onClick={handleLogin}>Log in</button>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);

export default PartnerLogin;
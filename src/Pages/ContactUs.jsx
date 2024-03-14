import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase, writeToFirebase } from "../firebase";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [quote, setQuote] = useState("");
  const [address, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [data, setData] = useState([]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    const requiredFields = ["name", "email", "message"];
    const emptyFieldsArray = requiredFields.filter((field) => !eval(field)); // Check if each required field is empty
    const isEmailValid = validateEmail(email);
    setEmptyFields(emptyFieldsArray);
    setIsValidEmail(isEmailValid);
    return emptyFieldsArray.length === 0 && isValidEmail;
  };

  const submit = () => {
    if (validateFields()) {
      setLoading(true);
      // Get the current epoch timestamp (in milliseconds)
      const epochTimestamp = Date.now();

      // Convert the epoch timestamp to a string
      const epochTimestampString = epochTimestamp.toString();

      // Encode the string as a base64 string
      const base64String = btoa(epochTimestampString);
      const data = {
        name: name,
        email: email,
        message: message,
        phone: phone || "", // Set to blank string if undefined
        address: address || "", // Set to blank string if undefined
        companyName: companyName || "", // Set to blank string if undefined
        quote: quote || "", // Set to blank string if undefined
        token: base64String,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "no-cors",
      };
      fetch("https://mailauth.vedicxcel.com", options)
        .then((response) => {
          console.log(response);
          setName("");
          setEmail("");
          setMessage("");
          setAdress("");
          setPhone("");
          setQuote("");
          setcompanyName("");
          setEmailSent(true);
          writeToFirebase("contactUs/enquiries", data);
          const obj = {
            value: "true",
            expires: new Date().setDate(new Date().getDate() + 1).toString(),
          };
          localStorage.setItem("emailSent", JSON.stringify(obj));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  useEffect(() => {
    //Check if the user has already sent an email on page load
    const emailSent = JSON.parse(localStorage.getItem("emailSent"));
    const res = new Date().getTime().toString() <= emailSent?.expires;
    setEmailSent(res);
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.contactUs);
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
    <div id="ContactUs" className="Dark-Gradient">
      <section className="banner-contact">
        <img src={data.image} />
      </section>
      {emailSent ? (
        <div class="flex flex-col justify-center items-center h-screen">
          <span
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              display: emailSent ? "inline" : "none",
              width: "70%",
            }}
            className="contact-form text-center"
          >
            {data.h3}
          </span>
          <div class="flex-grow"></div>
        </div>
      ) : (
        <div id="ContactUs" className="contact-form">
          <>
            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={emptyFields.includes("name") ? "highlight" : ""}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              className={emptyFields.includes("companyName") ? "highlight" : ""}
            />
            <input
              type="tel"
              placeholder="Contact Number"
              value={phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                // const isValidPhoneNumber = /^\d{10}$|^\d{11}$|^\d{12}$/.test(inputValue);
                // if (inputValue === '' || isValidPhoneNumber) {
                setPhone(inputValue);
                // }
              }}
              pattern="\d*"
              className={emptyFields.includes("phone") ? "highlight" : ""}
            />
            <input
              type="email"
              placeholder="Your Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emptyFields.includes("email") ? "highlight" : ""}
            />
            <input
              type="number"
              placeholder="Your Budget"
              value={quote}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (
                  inputValue === "" ||
                  (inputValue >= 0 && /^\d*\.?\d*$/.test(inputValue))
                ) {
                  setQuote(inputValue);
                }
              }}
              pattern="\d*"
              className={emptyFields.includes("quote") ? "highlight" : ""}
            />
            <textarea
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
              className={emptyFields.includes("address") ? "highlight" : ""}
            ></textarea>
            <textarea
              placeholder="Your Message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={emptyFields.includes("message") ? "highlight" : ""}
            ></textarea>
            <button onClick={submit} disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
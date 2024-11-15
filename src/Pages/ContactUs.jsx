import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase, writeToFirebase } from "../firebase";
import styles from "../style";
import { Footer, Navbar } from "../components";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    quote: "",
    address: "",
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    const emailSent = JSON.parse(localStorage.getItem("emailSent"));
    const res = emailSent?.expires
      ? new Date().getTime().toString() <= emailSent.expires
      : false;
    setEmailSent(res);

    const unsubscribe = fetchDataFromFirebase((jsonData) => {
      setData(jsonData.contactUs);
    });

    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{8,}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.phone && !phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid phone format";
    if (formData.quote && isNaN(formData.quote))
      newErrors.quote = "Budget must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const epochTimestamp = Date.now();
    const base64String = btoa(epochTimestamp.toString());

    const submissionData = {
      ...formData,
      token: base64String,
    };

    try {
      const response = await fetch("https://mailauth.vedicxcel.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
        mode: "no-cors",
      });

      await writeToFirebase("contactUs/enquiries", submissionData);

      setFormData({
        name: "",
        companyName: "",
        phone: "",
        email: "",
        quote: "",
        address: "",
        message: "",
      });

      setEmailSent(true);
      localStorage.setItem(
        "emailSent",
        JSON.stringify({
          value: "true",
          expires: new Date().setDate(new Date().getDate() + 1).toString(),
        })
      );
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className={`${styles.paragraph} max-w-[600px] mx-auto`}>
              Let's discuss how we can help transform your business with
              innovative solutions.
            </p>
          </div>

          {emailSent ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="bg-black-gradient-2 p-8 rounded-[20px] max-w-[600px] w-full text-center">
                <h2 className="text-gradient text-[24px] font-semibold mb-4">
                  Thank You!
                </h2>
                <p className="text-white">{data.h3}</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-[800px] mx-auto mb-20"
            >
              <div className="bg-black-gradient-2 rounded-[20px] p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="text-white mb-2 block">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-primary border ${
                        errors.name ? "border-red-500" : "border-dimWhite"
                      } rounded-lg p-3 text-white`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="text-white mb-2 block">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-primary border border-dimWhite rounded-lg p-3 text-white"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-white mb-2 block">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-primary border ${
                        errors.email ? "border-red-500" : "border-dimWhite"
                      } rounded-lg p-3 text-white`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="text-white mb-2 block">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-primary border ${
                        errors.phone ? "border-red-500" : "border-dimWhite"
                      } rounded-lg p-3 text-white`}
                      placeholder="+1234567890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="text-white mb-2 block">Budget</label>
                    <input
                      type="text"
                      name="quote"
                      value={formData.quote}
                      onChange={handleChange}
                      className={`w-full bg-primary border ${
                        errors.quote ? "border-red-500" : "border-dimWhite"
                      } rounded-lg p-3 text-white`}
                      placeholder="Your Budget"
                    />
                    {errors.quote && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quote}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="text-white mb-2 block">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-primary border border-dimWhite rounded-lg p-3 text-white"
                      placeholder="Your Address"
                    />
                  </div>

                  <div className="form-group md:col-span-2">
                    <label className="text-white mb-2 block">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-primary border ${
                        errors.message ? "border-red-500" : "border-dimWhite"
                      } rounded-lg p-3 text-white min-h-[150px]`}
                      placeholder="Your Message"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="text-red-500 text-center mt-4">
                    {errors.submit}
                  </div>
                )}

                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-gradient text-primary font-semibold py-4 px-8 rounded-[10px] transition-all hover:opacity-90 disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          )}
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

export default ContactUs;
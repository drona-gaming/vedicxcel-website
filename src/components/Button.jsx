import { useNavigate } from "react-router-dom";

const Button = ({ buttonText, styles }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
      onClick={() => navigate("/ContactUs")}
    >
      {buttonText}{" "}
    </button>
  );
};

export default Button;
import React from "react";
import Input from "../../components/Form/Input.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import { useState } from "react";
import { ROUTES } from "../../routes/RouterConfig.js";
import { toast, ToastContainer } from "react-toastify";
import { authAPI } from "../../apis/LoginApi/loginapi.js";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Invalid Credentials !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      setLoading(true);
      let data = await authAPI.postlogin({
        email: email,
        password: password,
      });

      if (data.success) {
        console.log(data);
        sessionStorage.setItem("token",data.token);
        localStorage.setItem("uid",data.user._id);
        localStorage.setItem("role",data.user.role);
        navigate(ROUTES.Home);  
      }
    } catch (error) {
      toast.error("Something went wrong. Please enter correct Credentials", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-[3rem] items-center p-8">

      </div>
      <div className="min-h-[70vh] flex items-center">
        <ToastContainer />
        {loading && <Loader />}
        <div className="flex flex-col gap-[10px] card w-[50%] shadow-[0px_0px_8px_rgba(0,0,0,0.1)] bg-[#3c3c3c]/[0.1] py-[100px] px-[20px] rounded-[8px]  mx-auto">
          <h1 className="text-center text-2xl font-semibold">LOGIN</h1>
          <div className="flex flex-col gap-[10px] w-[50%] mt-[60px] mx-auto">
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-[#000] text-[#fff] w-[50%] mx-auto font-semibold rounded-[4px]  py-[8px] mt-[20px]"
            onClick={() => {
              handleLogin();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

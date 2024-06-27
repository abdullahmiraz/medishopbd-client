"use client";
import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../api";
import { useRouter } from "next/navigation";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/api/users/login`, {
        phone,
        password,
      });
      console.log("Login successfdul:", response.data);
      localStorage.setItem("loginData", JSON.stringify(response.data));
      sessionStorage.setItem("mongoUserId", response.data.userId);
      // handle successful login, e.g., redirect to another page, store token, etc.
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      // handle error, e.g., show error message to user
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <h1 className="text-3xl font-bold">Login now!</h1>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="phone number"
                className="input input-bordered"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
                <a href="../signup" className="label-text-alt link link-hover">
                  Create Account ?
                </a>
              </div>
            </div>
            <div className="form-control gap-4 mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

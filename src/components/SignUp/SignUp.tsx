"use client";

import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../api";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import toast, { Toaster } from "react-hot-toast";

const SignUp: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the router

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sign up the user
      const signupResponse = await axios.post(`${serverUrl}/api/users/signup`, {
        phone,
        password,
      });
      console.log("Sign up successful:", signupResponse.data);

      // Log in the user immediately after sign up
      const loginResponse = await axios.post(`${serverUrl}/api/users/login`, {
        phone,
        password,
      });
      console.log("Login successful:", loginResponse.data);

      // Store login data in localStorage and sessionStorage
      localStorage.setItem("loginData", JSON.stringify(loginResponse.data));
      sessionStorage.setItem("mongoUserId", loginResponse.data.userId);

      // Redirect to the homepage or any other page
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data.message || error.message);

      console.error(
        "Error signing up or logging in:",
        error.response?.data || error.message
      );
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Toaster />
      <div className="hero-content flex-col">
        <h1 className="text-3xl font-bold">Sign Up now!</h1>
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
            </div>
            <div className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
              <a href="../login" className="label-text-alt link link-hover">
                Login
              </a>
            </div>
            <div className="form-control gap-4 mt-6">
              <button className="btn btn-primary" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

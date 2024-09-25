"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { signUpUser } from "../../redux/features/user/userSlice";

const SignUp: React.FC = () => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(signUpUser({ phone, password })).unwrap();
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Sign Up failed");
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
              <div className="flex">
                <span className="input input-bordered flex bg-gray-200 text-black px-3 py-3">
                  +88
                </span>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="input input-bordered flex-grow"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="^01[3-9][0-9]{8}$" // Adjusted pattern to include leading '0'
                  required
                />
              </div>
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
              <a href="/login" className="label-text-alt link link-hover">
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

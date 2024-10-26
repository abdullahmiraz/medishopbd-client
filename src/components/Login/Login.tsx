"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { StatusCode } from "../../utils/StatusCode";
import { AppDispatch, RootState } from "../../redux/store/store";

const Login: React.FC = () => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch<AppDispatch>(); // Type useDispatch as AppDispatch
  const router = useRouter();

  const { status, error, isAuthenticated } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ phone, password })).unwrap();
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <Toaster />
      <div className="hero-content flex-col">
        <h1 className="text-3xl font-bold">Login now!</h1>
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
                  // pattern="^01[3-9][0-9]{8}$"
                  required
                />
              </div>
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="phone number"
                className="input input-bordered"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div> */}
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
              <div className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
                <a href="/signup" className="label-text-alt link link-hover">
                  Create Account?
                </a>
              </div>
            </div>
            <div className="form-control gap-4 mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === StatusCode.LOADING}
              >
                {status === StatusCode.LOADING ? "Logging in..." : "Login"}
              </button>
            </div>
            {status === StatusCode.ERROR && error && (
              <div className="text-red-500 mt-4">
                {typeof error === "string"
                  ? error
                  : "An unexpected error occurred"}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

"use client";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    // Add logic to send data to backend or handle signup process
  };

  const validateEmail = (email: string): boolean => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    return regex.test(phoneNumber);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <h1 className="text-3xl font-bold">SignUp now!</h1>
        <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {!validateEmail(formData.email) && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid email address
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {!validatePhoneNumber(formData.phone) && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid Phone Number
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className=" input input-bordered"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control gap-4 mt-6">
              <button type="submit" className="btn btn-primary">
                SignUp
              </button>
              <button className="btn btn-warning">
                {" "}
                <FaGoogle /> SignUp By Google
              </button>
            </div>
            <p>
              Already Have an account ?{" "}
              <Link className="text-blue-700" href={"../login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

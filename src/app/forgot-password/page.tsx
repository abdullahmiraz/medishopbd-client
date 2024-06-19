"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import useState from "react";
import { auth } from "../../firebase/firebase.config";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <h1 className="text-3xl font-bold">Forgot Password ?</h1>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onChange={(e) => setEmail(e.target.email)}
                />
              </div>

              <div className="form-control gap-4 mt-6">
                <button
                  onClick={() => resetEmail()}
                  disabled={!email}
                  className="disabled:opacity-40 btn btn-primary"
                >
                  Send Forgot Password Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

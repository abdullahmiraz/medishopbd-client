"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <h1 className="text-3xl font-bold">Login now!</h1>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="label">
                  <a
                    onClick={() => router.push("/forgot-password")}
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                  <a
                    href="../signup"
                    className="label-text-alt link link-hover"
                  >
                    Create Account?
                  </a>
                </div>
              </div>
              <div className="form-control gap-4 mt-6">
                <button
                  type="button"
                  onClick={() =>
                    signIn("credentials", {
                      email,
                      password,
                      redirect: true,
                      callbackUrl: "/",
                    })
                  }
                  disabled={!email || !password}
                  className="btn btn-primary"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="btn btn-warning"
                >
                  <FaGoogle /> Login By Google
                </button>
                {session?.user?.name && (
                  <div className="mt-4">
                    <p>Logged in as {session.user.name}</p>
                    <button
                      onClick={() => signOut()}
                      className="btn btn-secondary"
                    >
                      LogOut
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

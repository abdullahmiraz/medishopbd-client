import { FaGoogle } from "react-icons/fa";

const Login = () => {
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
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
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
                  required
                />
                <div className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                  <a
                    href="../signup"
                    className="label-text-alt link link-hover"
                  >
                    Create Account ?
                  </a>
                </div>
              </div>
              <div className="form-control gap-4 mt-6">
                <button className="btn btn-primary">Login</button>
                <button className="btn btn-warning">
                  {" "}
                  <FaGoogle /> Login By Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

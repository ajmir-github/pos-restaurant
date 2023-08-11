import { useEffect, useRef, useState } from "react";
import { getCurrentUser, resetUserPassword, signUser } from "../firebase";
import { classes } from "../utils";
import { useNavigate } from "react-router-dom";
import { ICON_ARROW_LEFT, ICON_ARROW_RIGHT } from "../utils/icons";
import Layout from "../components/Layout";

const TABS = {
  signIn: "SIGN_IN",
  forgetPass: "FORGET_PASS",
};
export default function Login() {
  const [tab, setTab] = useState(TABS.signIn);
  const [alerts, setAlerts] = useState({ field: "", message: "" });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    signUser(email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorMessage);
        if (errorCode === "auth/user-not-found")
          setAlerts({
            field: "email",
            message: "Email not found!",
          });
        if (errorCode === "auth/wrong-password")
          setAlerts({
            field: "password",
            message: "Password not matched!",
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForgotPassword = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target);

    const email = form.get("email");
    resetUserPassword(email)
      .then(() => {
        setToast("You are sent an email. Please check it out!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="w-full min-h-screen flex justify-center items-center p-2">
        <div className={loading ? "block" : "hidden"}>
          <span className="loading loading-infinity loading-lg"></span>
        </div>

        {tab === TABS.signIn && (
          <form
            className={
              loading
                ? "hidden"
                : "flex grow flex-col items-center justify-center"
            }
            onSubmit={handleSignIn}
          >
            <div className="flex flex-col w-full max-w-md gap-2 bg-gray-500 bg-opacity-10 p-4 rounded-box">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  className={classes(
                    "input input-bordered w-full",
                    alerts.field === "email" && "input-error"
                  )}
                  type="email"
                  name="email"
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {alerts.field === "email" && alerts.message}
                  </span>
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className={classes(
                    "input input-bordered w-full",
                    alerts.field === "password" && "input-error"
                  )}
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {alerts.field === "password" && alerts.message}
                  </span>
                </label>
              </div>

              <button className="btn w-full btn-primary" type="submit">
                Sign in
              </button>

              <button
                className="btn w-full btn-ghost text-start"
                onClick={() => setTab(TABS.forgetPass)}
              >
                Forget password? {ICON_ARROW_RIGHT}
              </button>
            </div>
          </form>
        )}

        {tab === TABS.forgetPass && (
          <form
            className={
              loading
                ? "hidden"
                : "flex grow flex-col items-center justify-center"
            }
            onSubmit={handleForgotPassword}
          >
            <div className="flex flex-col w-full max-w-md gap-2 bg-gray-500 bg-opacity-10 p-4 rounded-box">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  className={classes(
                    "input input-bordered w-full",
                    alerts.field === "email" && "input-error"
                  )}
                  type="email"
                  name="email"
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {alerts.field === "email" && alerts.message}
                  </span>
                </label>
              </div>

              {toast && <div className="alert alert-info">{toast}</div>}

              <button
                className="btn w-full btn-primary"
                type="submit"
                disabled={toast}
              >
                Forget password?
              </button>

              <button
                className="btn w-full btn-ghost text-start"
                onClick={() => setTab(TABS.signIn)}
              >
                Sign in
                {ICON_ARROW_LEFT}
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

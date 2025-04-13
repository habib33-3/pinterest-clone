import { useState } from "react";

import { useNavigate } from "react-router";

import Image from "../../components/Image/Image";
import { apiRequest } from "../../utils/apiRequest";
import { useAuthStore } from "../../utils/store";
import "./authPage.css";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setCurrentUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post(
        `/user/auth/${isRegister ? "register" : "login"}`,
        data
      );

      setCurrentUser(res.data);

      if (res.status === 200 || res.status === 201) {
        navigate("/");
      }

      console.log(res);
    } catch (error) {
      setError(error.response.data.message || "An error has occurred");
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <Image
          path={"/general/logo.png"}
          alt={""}
        />
        <h1>{isRegister ? "Create an account" : "Log in to your account"}</h1>

        {isRegister ? (
          <form
            key={"register"}
            action=""
            onSubmit={handleSubmit}
          >
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                placeholder="Enter your displayName"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit">Register</button>

            <p onClick={() => setIsRegister(false)}>
              Already have an account? <b>log in</b>
            </p>

            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form
            key={"login"}
            action=""
            onSubmit={handleSubmit}
          >
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit">Log in</button>

            <p onClick={() => setIsRegister(true)}>
              Don't have an account? <b>register</b>
            </p>

            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

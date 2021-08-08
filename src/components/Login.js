import "./Login.css";

import { useState } from "react";
import axios from "axios";

const Login = ({ modals, setModals, setUser }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessage, setErrormessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://benalgo-marvel-server.herokuapp.com/user/login`,
        data
      );
      const token = response.data.token;
      setUser(token);
      const tab = [...modals];
      tab[1] = false;
      setModals(tab);
    } catch (error) {
      if (error.response.status === 401) {
        setErrormessage("Email and/or password are incorrect");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <h2>Sign in</h2>
        <form className="Login-form" onSubmit={(event) => handleSubmit(event)}>
          <input
            placeholder="Email"
            type="email"
            onChange={(event) => {
              const obj = { ...data };
              obj.email = event.target.value;
              setData(obj);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(event) => {
              const obj = { ...data };
              obj.password = event.target.value;
              setData(obj);
            }}
          />
          <p>{errorMessage}</p>
          <input type="submit" />
        </form>
        <span
          onClick={() => {
            let tab = [...modals];
            tab = [true, false];
            setModals(tab);
          }}
          className="Login-redirect"
        >
          Pas encore de compte ? Inscris-toi !
        </span>
      </div>
    </div>
  );
};

export default Login;

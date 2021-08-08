import "./Signup.css";

import { useState } from "react";
import axios from "axios";

const Signup = ({ modals, setModals, setUser }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrormessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://benalgo-marvel-server.herokuapp.com/user/signup`,
        data
      );
      if (response.data.token) {
        setUser(response.data.token);
        const tab = [...modals];
        tab[0] = false;
        setModals(tab);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrormessage("A user have already the same email.");
      }
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="Signup">
      <div className="Signup-container">
        <h2>Register</h2>
        <form className="Signup-form" onSubmit={(event) => handleSubmit(event)}>
          <input
            placeholder="Username"
            type="text"
            onChange={(event) => {
              const obj = { ...data };
              obj.username = event.target.value;
              setData(obj);
            }}
          />
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
            tab = [false, true];
            setModals(tab);
          }}
          className="Signup-redirect"
        >
          You already have an account ? Sign in !
        </span>
      </div>
    </div>
  );
};

export default Signup;

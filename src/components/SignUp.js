import { useState } from "react";
import axios from "axios";
import "../styles/Signup.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(username, password);
    axios
      .post("http://localhost:5000/signup", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div class="register" className="outcard">
        <h1 className="center"> SIGNUP</h1>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-dark">
          Submit
        </button>
      </div>
    </div>
  );
}

export default SignUp;

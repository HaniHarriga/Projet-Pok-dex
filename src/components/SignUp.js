import { useState } from "react";
import axios from "axios";

// function SignUp() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

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

//   return (
//     <div className="outcard">
//       <h1 className="center"> SIGNUP</h1>
//       Username
//       <input
//         className="inputs"
//         type="text"
//         value={username}
//         onChange={(e) => {
//           setUsername(e.target.value);
//         }}
//       />{" "}
//       <br /> <br />
//       Password{" "}
//       <input
//         className="inputs"
//         type="password"
//         value={password}
//         onChange={(e) => {
//           setPassword(e.target.value);
//         }}
//       />{" "}
//       <br /> <br />
//       <button onClick={handleSubmit} className="btns">
//         {" "}
//         Submit
//       </button>
//     </div>
//   );
// }

// export default SignUp;

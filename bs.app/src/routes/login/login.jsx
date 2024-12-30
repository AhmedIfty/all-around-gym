import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // To send cookies if required
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login, redirect to the home page
        navigate("/");
        window.location.reload();
      } else {
        // Display error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <Link to="/register">Already have an account?</Link>
          {/* <Link to="/AdminLogin">Login as an admin?</Link> */}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;


// import "./login.scss";
// import { Link } from "react-router-dom";

// function Login() {
//   return (
//     <div className="login">
//       <div className="formContainer">
//         <form>
//           <h1>Welcome back</h1>
//           <input name="username" type="text" placeholder="Username" />
//           <input name="password" type="password" placeholder="Password" />
//           <button>Login</button>
//           <Link to="/register">{"Don't"} you have an account?</Link>
//         </form>
//       </div>
//       <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Login;
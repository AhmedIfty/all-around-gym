import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, redirect to login page or homepage
        navigate("/login"); // Redirect to the login page
      } else {
        // Display error message if registration failed
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register_main">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;


// import "./Register.scss";
// import { Link } from "react-router-dom";

// import React from 'react'

// const Register = () => {
//   return (
//     <div className="register_main">
//       <div className="formContainer">
//         <form>
//           <h1>Create an Account</h1>
//           <input name="username" type="text" placeholder="Username" />
//           <input name="email" type="text" placeholder="Email" />
//           <input name="password" type="password" placeholder="Password" />
//           <button >Register</button>
//           <Link to="/login">Do you have an account?</Link>
//         </form>
//       </div>
//       {/* <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div> */}
//     </div>
//   )
// }

// export default Register
















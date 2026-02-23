import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
  alert("Passwords do not match!");
  return;
}

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert("Signup successful!");
      navigate("/signin");
      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
         <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <p>Having account already?</p>
          <a href="/signin">Signin here</a>

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

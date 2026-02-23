import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

      try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    const { token, user } = res.data;

    // Store token
    localStorage.setItem("token", token);

    // Store user info
    localStorage.setItem("user", JSON.stringify(user));

    // Optional: set default auth header for future axios calls
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    navigate("/home");

  } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Signin failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signin</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* <p>create account</p>
          <a href="/signup">Signup here</a> */}
          <button type="submit">Signin</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;

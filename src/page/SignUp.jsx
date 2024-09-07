import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SuccessMessage from "../components/Successalert";
function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false); // State to manage success message visibility
  const navigate = useNavigate();
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { username: "", email: "", password: "" };
    if (!formData.username) {
      formIsValid = false;
      newErrors.username = "Username is required.";
    }

    if (!formData.email) {
      formIsValid = false;
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      formIsValid = false;
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      formIsValid = false;
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return formIsValid;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "https://link-shortener-express.vercel.app/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Form submitted successfully", data);
          setShowSuccess(true); // Show success message
          setTimeout(() => {
            setShowSuccess(false);
            navigate("/shortenurls");
          }, 2000); // Hide message after 2 seconds and navigate
        } else {
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <Header showLoginSignup={true}/>
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl mt-10 sm:mt-12 md:mt-14">
          Create Account
        </h1>
      </div>
      <div className="w-11/12 sm:w-4/6 md:w-3/6 mx-auto mt-10 sm:mt-12 md:mt-14">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-left">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-left">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-left">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-left">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-left">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-left">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 md:px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up
          </button>
        </form>
        {showSuccess && <SuccessMessage message="Account created successfully!" />} {/* Render success message */}
      </div>
    </div>
  );
}

export default SignUp;

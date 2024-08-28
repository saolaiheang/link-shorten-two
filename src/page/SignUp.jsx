import React, { useState } from "react";
import Header from "../components/Header";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      console.log("Form submitted successfully", formData);
      // You can add your form submission logic here
    } else {
      // Clear the form if validation fails
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="text-6xl mt-14">Create Account</h1>
      </div>
      <div className="w-3/6 mx-auto mt-14">
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
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

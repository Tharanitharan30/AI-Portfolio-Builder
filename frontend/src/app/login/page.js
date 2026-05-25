"use client";

import { useState } from "react";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    localStorage.setItem(
      "token",
      data.token
    );

    alert("Login successful");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-black text-white p-2"
        >
          Login
        </button>

      </form>
    </div>
  );
}
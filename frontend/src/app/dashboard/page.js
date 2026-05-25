"use client";

import { useState } from "react";

export default function Dashboard() {

  const [portfolio, setPortfolio] = useState({
    user_email: "",
    bio: "",
    skills: "",
    project_title: "",
    project_description: "",
    technologies: "",
    college: "",
    degree: "",
    year: ""
  });

  const handleChange = (e) => {
    setPortfolio({
      ...portfolio,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      user_email: portfolio.user_email,
      bio: portfolio.bio,

      skills: portfolio.skills.split(","),

      projects: [
        {
          title: portfolio.project_title,
          description:
            portfolio.project_description,

          technologies:
            portfolio.technologies.split(",")
        }
      ],

      education: [
        {
          college: portfolio.college,
          degree: portfolio.degree,
          year: portfolio.year
        }
      ]
    };

    const response = await fetch(
      "http://127.0.0.1:8000/create-portfolio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedData)
      }
    );

    const data = await response.json();

    alert(data.message);
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl mb-5">
        Portfolio Dashboard
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[500px]"
      >

        <input
          type="email"
          name="user_email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills comma separated"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="project_title"
          placeholder="Project Title"
          onChange={handleChange}
          className="border p-2"
        />

        <textarea
          name="project_description"
          placeholder="Project Description"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="technologies"
          placeholder="Technologies comma separated"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="college"
          placeholder="College"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-black text-white p-2"
        >
          Save Portfolio
        </button>

      </form>
    </div>
  );
}
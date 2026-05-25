"use client";

import { useEffect, useState } from "react";

export default function Preview() {

  const [portfolio, setPortfolio] =
    useState(null);

  useEffect(() => {

    fetch(
      "http://127.0.0.1:8000/get-portfolio/tharani@gmail.com"
    )
      .then((res) => res.json())
      .then((data) => setPortfolio(data));

  }, []);

  if (!portfolio) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl mb-4">
        {portfolio.user_email}
      </h1>

      <p className="mb-5">
        {portfolio.bio}
      </p>

      <h2 className="text-2xl">
        Skills
      </h2>

      <ul>
        {portfolio.skills.map((skill, index) => (
          <li key={index}>
            {skill}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl mt-5">
        Projects
      </h2>

      {portfolio.projects.map((project, index) => (
        <div
          key={index}
          className="border p-4 mt-2"
        >
          <h3>{project.title}</h3>

          <p>{project.description}</p>
        </div>
      ))}

    </div>
  );
}

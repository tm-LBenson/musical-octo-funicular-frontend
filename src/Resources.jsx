import React, { useEffect, useState } from "react";
import { BACKEND } from "./config";

function Resources({ getResources, setResources, resources, loading }) {
  // STATE
  const [error, setError] = useState("");

  useEffect(() => {
    getResources(setResources, setError);
  }, []);

  if (error) {
    return <h2>Something went wrong</h2>;
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <section>
        {resources.map((resource) => (
          <article key={resource.id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <p>{resource.category}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Resources;

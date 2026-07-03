import React, { useEffect, useState } from "react";
import { BACKEND } from "./config";

function Resources() {
  // STATE
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getResources();
  }, []);

  async function getResources() {
    try {
      const res = await fetch(BACKEND + "/api/resources");
      const data = await res.json();
      setResources(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <h2>Something went wrong</h2>;
  }
  if (loading){
    return <h2>Loading...</h2>
  }

  return <div>
    <section>
      {resources.map(resource => (
        <article key={resource.id}>
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <p>{resource.category}</p>
        </article>
      ))}
    </section>
  </div>
}

export default Resources;

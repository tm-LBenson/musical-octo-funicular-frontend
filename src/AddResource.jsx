import React, { useState } from "react";
import { BACKEND } from "./config";

function AddResource({ getResources, setResources, loading, setLoading }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function createResource(e) {
    e.preventDefault();
    setLoading(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        category,
      }),
    };

    try {
      const res = await fetch(BACKEND + "/api/resources", options);
      const data = await res.json();
      setTitle("");
      setDescription("");
      setCategory("");
      getResources(setResources, setLoading, setError);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h3>Creating item....</h3>;
  }
  if (error) {
    return <h3>Failed to create: {title}</h3>;
  }

  return (
    <form onSubmit={createResource}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="title">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="title">Category</label>
      <input
        type="text"
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddResource;

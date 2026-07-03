import { useEffect, useState } from "react";
import "./App.css";
import { BACKEND } from "./config";
import Resources from "./Resources";
import AddResource from "./AddResource";

function App() {
  const [resources, setResources] = useState([]);
  const [health, setHealth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  async function getHealth() {
    try {
      const res = await fetch(BACKEND);
      const { message } = await res.json();

      setHealth(message);
    } catch (error) {
      setError(["Something went wrong with the health check.", error]);
    }
  }

  async function getResources(setResources, setError) {
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
  useEffect(() => {
    getHealth();
  }, []);

  if (error) {
    {
      console.log(error[0]);
    }
    {
      console.error(error[1]);
    }
    return <h2>Something went wrong.</h2>;
  }

  return (
    <>
      <h1>Welcome!</h1>
      <Resources
        loading={loading}
          getResources={getResources}
        setResources={setResources}
        resources={resources}
      />
      <AddResource
        loading={loading}
        setLoading={setLoading}
        setResources={setResources}
        getResources={getResources}
      />
    </>
  );
}

export default App;

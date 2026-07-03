import { useEffect, useState } from "react";
import "./App.css";
import { BACKEND } from "./config";
import Resources from "./Resources";

function App() {
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

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h1>Welcome!</h1>
      <Resources />
    </>
  );
}

export default App;

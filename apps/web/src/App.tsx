import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<string>("checking...");

  useEffect(() => {
    fetch("http://localhost:3000/health")
      .then((response) => response.json())
      .then((data) => setStatus(data.status))
      .catch((error) => {
        console.error("Failed to reach API:", error);
        setStatus("unreachable");
      });
  }, []);

  return (
    <div>
      <h1>Dynasty Drive</h1>
      <p>API status: {status}</p>
    </div>
  );
}

export default App;

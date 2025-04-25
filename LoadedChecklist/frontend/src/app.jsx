import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/checklist")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Loaded Checklist</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input type="checkbox" checked={item.isCompleted} readOnly />
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
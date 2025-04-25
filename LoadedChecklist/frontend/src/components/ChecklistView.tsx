import React, { useEffect, useState } from "react";

type ChecklistItem = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export default function ChecklistView() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/checklist")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setItems)
      .catch(() => setError("Unable to load checklist 😢"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Loaded Checklist ✅</h1>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="border p-2 rounded shadow-sm flex items-center">
            <input
              type="checkbox"
              checked={item.isCompleted}
              readOnly
              className="mr-2"
            />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

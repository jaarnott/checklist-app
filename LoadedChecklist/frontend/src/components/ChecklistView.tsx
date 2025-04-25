import { useState, useEffect, FormEvent } from 'react';

interface ChecklistItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

function Checklist() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('/api/checklist')
      .then((response) => response.json())
      .then((data: ChecklistItem[]) => setItems(data))
      .catch((error) => setError('Error fetching checklist: ' + error.message));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, isCompleted: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      setNewTitle('');
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Checklist Items</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="New item title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Item'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} {item.isCompleted ? '✅' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;
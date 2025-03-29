import { useState, useEffect } from "react";

const UpdateItem = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", status: "" });
  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${itemId}`;

  // Fetch the existing item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URI);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
          setFormData({ name: data.name, status: data.status });
        } else {
          console.error("Failed to fetch item");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchItem();
  }, [API_URI]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URI, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setItem(updatedItem);
        alert("Item updated successfully!");
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateItem;
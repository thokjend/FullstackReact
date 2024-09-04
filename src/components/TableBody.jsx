import { useState } from "react";

export function TableBody({ items, refreshItem }) {
  const [editMode, setEditMode] = useState(false);
  const [editObject, setEditObject] = useState({
    id: "",
    type: "",
    name: "",
    ilvl: "",
  });

  async function remove(id) {
    const response = await fetch(`http://localhost:3000/api/items/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      refreshItem();
    }
  }
  function enterEditMode(id, type, name, ilvl) {
    setEditMode(true);
    setEditObject({ id, type, name, ilvl });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function updateItem(id) {
    const response = await fetch(`http://localhost:3000/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Type: editObject.type,
        Name: editObject.name,
        ItemLevel: editObject.ilvl,
      }),
    });

    if (response.ok) {
      refreshItem();
      setEditMode(false);
    }
  }

  function createRows(items) {
    return (
      <tbody>
        {items.map((item) =>
          editMode && editObject.id === item.Id ? (
            <tr key={item.Id}>
              <td>{item.Id}</td>
              <td>
                <input
                  type="text"
                  name="type"
                  value={editObject.type}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={editObject.name}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="ilvl"
                  value={editObject.ilvl}
                  onChange={handleChange}
                  min={0}
                />
              </td>
              <td>
                <button onClick={() => updateItem(item.Id)}>Save</button>
              </td>
              <td>
                <div id="btn" onClick={() => remove(item.Id)}>
                  X
                </div>
              </td>
            </tr>
          ) : (
            <tr key={item.Id}>
              <td>{item.Id}</td>
              <td>{item.Type}</td>
              <td>{item.Name}</td>
              <td>{item.ItemLevel}</td>
              <td>
                <button
                  onClick={() =>
                    enterEditMode(item.Id, item.Type, item.Name, item.ItemLevel)
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <div id="btn" onClick={() => remove(item.Id)}>
                  X
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    );
  }

  return createRows(items);
}

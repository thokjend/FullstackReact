import { useState } from "react";

export function InputBox({ refreshItems }) {
  const [itemObject, setItemObject] = useState({
    type: "",
    name: "",
    ilvl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemObject((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
  };

  async function addItem() {
    if (!itemObject.type || !itemObject.name || itemObject.ilvl === "") {
      return;
    }
    const response = await fetch("http://localhost:3000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Type: itemObject.type,
        Name: itemObject.name,
        ItemLevel: itemObject.ilvl,
      }),
    });

    if (response.ok) {
      setItemObject({ type: "", name: "", ilvl: "" });
      refreshItems();
    }
  }

  return (
    <div id="box1">
      <div>
        Type:
        <input
          type="text"
          name="type"
          value={itemObject.type}
          onChange={handleChange}
        />
      </div>
      <div>
        Name:
        <input
          type="text"
          name="name"
          value={itemObject.name}
          onChange={handleChange}
        />
      </div>
      <div>
        Item Level:
        <input
          type="number"
          name="ilvl"
          value={itemObject.ilvl}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
}

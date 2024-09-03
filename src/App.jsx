import { useEffect, useState } from "react";
import "./styles.css";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { InputBox } from "./components/InputBox";
export default function App() {
  const [items, setItems] = useState([]);

  const [editObject, setEditObject] = useState({
    id: "",
    type: "",
    name: "",
    ilvl: "",
  });

  const [editMode, setEditMode] = useState(false);

  async function getDatabase() {
    const response = await fetch("http://localhost:3000/api/items");
    const data = await response.json();
    setItems(data);
  }

  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <>
      <table>
        <TableHeader />
        <TableBody items={items} />
      </table>
      <InputBox refreshItems={getDatabase} />
    </>
  );
}

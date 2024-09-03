export function TableBody({ items, refreshItem }) {
  async function remove(id) {
    const response = await fetch(`http://localhost:3000/api/items/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      refreshItem();
    }
  }

  return (
    <tbody>
      {items.map((item, index) => (
        <tr key={item.Id || index}>
          <td>{item.Id}</td>
          <td>{item.Type}</td>
          <td>{item.Name}</td>
          <td>{item.ItemLevel}</td>
          <td>
            <div>
              <button>Edit</button>
            </div>
          </td>
          <td>
            <div id="btn" onClick={() => remove(item.Id)}>
              X
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

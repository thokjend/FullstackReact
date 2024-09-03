export function TableBody({ items }) {
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
            <div id="btn">X</div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

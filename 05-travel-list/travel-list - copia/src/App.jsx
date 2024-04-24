import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [data, setData] = useState([]);

  function onPacked(id) {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function onDelete(id) {
    setData( prevData => prevData.filter(item => item.id !== id))
  }
  return (
    <div className="app">
      <Logo />
      <Form setData={setData} />
      <PackingList data={data} onPacked={onPacked} onDelete={onDelete}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ setData }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleQuantity(e) {
    setQuantity(+e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: nanoid(),
      quantity,
      description,
      packed: false,
    };

    setData((prevData) => [...prevData, newItem]);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select onChange={handleQuantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={handleDescription}
        value={description}
      />
      <button>add</button>
    </form>
  );
}

function PackingList({ data, onPacked,onDelete }) {
  function handleChecked(id) {
    onPacked(id);
  }
  return (
    <div className="list">
      <ul>
        {data.map((item) => (
          <li key={item.id} >
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => handleChecked(item.id)}
            ></input>
            <p className={item.packed ? "packed" : null}>{item.description}</p>
            <span className="text-red pointer" onClick={() => onDelete(item.id)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button>Clear list</button>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>Add items to your list</em>
    </footer>
  );
}

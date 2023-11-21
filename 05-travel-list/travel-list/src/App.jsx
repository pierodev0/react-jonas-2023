import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Ron", quantity: 5, packed: true },
  { id: 4, description: "Chocolates", quantity: 1, packed: false },
  { id: 5, description: "tablet", quantity: 3, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(newItem) {
    setItems((oldItems) => [...oldItems, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((oldItems) => oldItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((oldItems) =>
      oldItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems(){
    if(!items.length) return
    const confirmed = confirm("Are you sure of clear all items?")
    if(confirmed ) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItems(newItem);

    // Restart values
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {[...Array(20)].map((_, i) => (
          <option key={i}>{i + 1}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackagingList({ items, onDeleteItem, onToggleItem,onClearItems }) {

  const [sortedBy,setSortedBy] = useState('input');

  let sortedItems;
  if(sortedBy === 'input') sortedItems = items;
  if(sortedBy == 'description'){
    sortedItems = items.slice().sort((a,b)=> a.description.localeCompare(b.description))
  }
  if(sortedBy == 'quantity'){
    sortedItems = items.slice().sort((a,b)=> b.quantity - a.quantity)
  }

  if(sortedBy == 'packed'){
    sortedItems = items.slice().sort((a,b)=> Number(a.packed) - Number(b.packed))
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
        <div className="actions">
          <select value={sortedBy} onChange={e => setSortedBy(e.target.value)}>
            <option value="input">Sorted by input order</option>
            <option value="description">Sorted by description</option>
            <option value="quantity">Sorted by quantity</option>
            <option value="packed">Sorted by packed</option>
          </select>
          {Boolean(items.length) && <button onClick={onClearItems}>Clear list</button>}
        </div>
      </div>
    </>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  const { packed, quantity, description, id } = item;
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onToggleItem(id)}
        checked={packed}
      />
      <span
        className={packed ? "packed" : ""}
      >{`${quantity} ${description}`}</span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start addding some items to your packing list 🚀</em>
      </footer>
    );
  }
  const numItems = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((itemsPacked / numItems) * 100) || 0;
  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You got everithing! Ready to go </em>
      ) : (
        <em>
          You have {numItems} items on your List, and you already packed{" "}
          {itemsPacked} ({percentage}%)
        </em>
      )}
    </footer>
  );
}

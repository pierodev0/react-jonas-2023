import "./index.css";
import { useState } from "react";
import { nanoid } from "nanoid";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
      <FormSplitBill/>
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          Debes a {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} te debe ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && (
        <p className="">Tu y {friend.name} estan empatados</p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="">+ Friend name</label>
      <input type="text" />

      <label htmlFor="">+ Image url</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with</h2>

      <label htmlFor="">+ Bill values</label>
      <input type="text" />

      <label htmlFor="">+ Your expenses</label>
      <input type="text" />

      <label htmlFor="">+ x's expenses</label>
      <input type="text" disabled/>

      <label htmlFor="">+ Who is paying the bill</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

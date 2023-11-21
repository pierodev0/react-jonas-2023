/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import pizzaData from "../public/data";
import "./index.css";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Menu />
        <Footer />
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {numPizzas > 0 ? (
        <React.Fragment>
          <p>
            Autentic Italin cousine. & craete dishes to choose from. All from
            our stone oven, all organica, all delicuos.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza key={pizza.name} pizza={pizza} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p>We're still workin on our menu. Please come back later :)</p>
      )}
    </main>
  );
}
function Pizza({ pizza }) {
  return (
    <li className={`pizza ${pizza.soldOut && 'sold-out'}`}>
      <img src={pizza.photoName} alt="Pizza Spinachi" />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? 'SOLD OUT' : pizza.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hours = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hours >= openHour && hours <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happty to welcome you between {openHour}:00 and {closeHour}:00-
        </p>
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us order
        online
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

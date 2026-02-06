import React, { useState } from "react";
import "./App.css";

function ShoppingCartManager() {
  const [cartItems, setCartItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Price, setPrice] = useState("");

  // Handle input change for quantity
  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  function handleItemNameChange(event) {
    setItemName(event.target.value);
  }


  // Handle input change for price
  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  // Add a new item to the list
  function addItem() {
    
    if (itemName.trim() !== "" && Quantity.trim() !== "" && Price.trim() !== "") {
      setCartItems((items) => [...items, { itemName, Quantity, Price }]);
      setItemName("");
      setQuantity("");
      setPrice(""); // Clear the input fields
    }
  }

  // Delete a item from the list
  function deleteItem(index) {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  }

  return (
    <div className="app-container">
      <h1>Shopping Cart Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter item name..."
          value={itemName}
          onChange={handleItemNameChange}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter item quantity..."
          value={Quantity}
          onChange={handleQuantityChange}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter item price..."
          value={Price}
          onChange={handlePriceChange}
          className="input-field"
        />

        <button onClick={addItem} className="add-button">
          Add Item
        </button>
      </div>

      <div className="items-section">
        <h2>Your Items ({cartItems.length})</h2>
        {cartItems.length === 0 ? (
          <p className="empty-message">No items yet. Add one to get started!</p>
        ) : (
          <ol className="items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="shopping-item">
                <div className="item-info">
                  <span className="item-title">{item.itemName}</span>
                  <span className="quantity-price">
                    Quantity: {item.Quantity}, Price: {item.Price}
                  </span>
                </div>

                <button
                  onClick={() => deleteItem(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default ShoppingCartManager;
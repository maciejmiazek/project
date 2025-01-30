import React, { useState } from "react"
import "./Warehouse.css"
// import WarehousePanel from "./WarehousePanel"
// import WarehousePanelWindow from "./WarehousePanelWindow"

const Warehouse = () => {
  const [activeCategory, setActiveCategory] = useState("Wszystko")
  const [selectedItem, setSelectedItem] = useState(null)
  const [history, setHistory] = useState({
    "Drewniana Belka 3m": [
      { amount: 5, unit: "szt.", date: "20.01.2024" },
      { amount: -3, unit: "szt.", date: "20.12.2023" },
      { amount: 10, unit: "szt.", date: "05.07.2022" },
    ],
    Piasek: [
      { amount: 50, unit: "kg", date: "15.01.2024" },
      { amount: -20, unit: "kg", date: "10.12.2023" },
    ],
    "Cement 25kg": [
      { amount: 5, unit: "szt.", date: "18.01.2024" },
      { amount: -2, unit: "szt.", date: "05.12.2023" },
    ],
  })
  const [newAmount, setNewAmount] = useState("")
  const [newDate, setNewDate] = useState("")
  const [isItemManagementOpen, setIsItemManagementOpen] = useState(false)
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false)

  const [items, setItems] = useState({
    Drewno: [
      { name: "Drewniana Belka 3m", quantity: 20, unit: "szt." },
      { name: "Drewniana Belka 2m", quantity: 20, unit: "szt." },
      { name: "Drewniana Belka 5m", quantity: 20, unit: "szt." },
      { name: "Drewniana Belka 10m", quantity: 20, unit: "szt." },
    ],
    Sypkie: [
      { name: "Piasek", quantity: 100, unit: "kg" },
      { name: "Żwir", quantity: 150, unit: "kg" },
      { name: "Kruszywo", quantity: 50, unit: "kg" },
      { name: "Gruz", quantity: 30, unit: "kg" },
    ],
    Worki: [
      { name: "Cement 25kg", quantity: 10, unit: "szt." },
      { name: "Wapno 25kg", quantity: 20, unit: "szt." },
      { name: "Zaprawa murarska 30kg", quantity: 50, unit: "szt." },
      { name: "Klej do styropianu 25kg", quantity: 15, unit: "szt." },
    ],
    Inne: [
      { name: "Gwoździe", quantity: 1000, unit: "szt." },
      { name: "Śruby", quantity: 500, unit: "szt." },
      { name: "Wkręty", quantity: 750, unit: "szt." },
      { name: "Podkładki", quantity: 300, unit: "szt." },
    ],
  })

  const updateQuantity = (amount) => {
    if (!selectedItem) return

    const parsedAmount = Number.parseInt(amount)
    if (isNaN(parsedAmount)) return

    setItems((prevItems) => {
      const newItems = { ...prevItems }
      const category = Object.keys(newItems).find((cat) =>
        newItems[cat].some((item) => item.name === selectedItem.name),
      )

      if (category) {
        const itemIndex = newItems[category].findIndex((item) => item.name === selectedItem.name)
        if (itemIndex !== -1) {
          const newQuantity = newItems[category][itemIndex].quantity + parsedAmount
          if (newQuantity >= 0) {
            newItems[category][itemIndex] = {
              ...newItems[category][itemIndex],
              quantity: newQuantity,
            }

            const newHistoryEntry = {
              amount: parsedAmount,
              unit: newItems[category][itemIndex].unit,
              date: newDate || new Date().toLocaleDateString("pl-PL"),
            }

            setHistory((prevHistory) => ({
              ...prevHistory,
              [selectedItem.name]: [newHistoryEntry, ...(prevHistory[selectedItem.name] || [])],
            }))

            setNewAmount("")
            setNewDate("")
          }
        }
      }

      return newItems
    })
  }

  const getFilteredItems = () => {
    if (activeCategory === "Wszystko") {
      return Object.values(items).flat()
    }
    return items[activeCategory] || []
  }

  const getItemHistory = () => {
    return selectedItem ? history[selectedItem.name] || [] : []
  }

  const handleSubmit = () => {
    if (newAmount) {
      updateQuantity(Number.parseInt(newAmount))
    }
  }

  const addCategory = (categoryName) => {
    setItems((prevItems) => ({
      ...prevItems,
      [categoryName]: [],
    }))
  }

  const removeCategory = (categoryName) => {
    setItems((prevItems) => {
      const newItems = { ...prevItems }
      delete newItems[categoryName]
      return newItems
    })
    if (activeCategory === categoryName) {
      setActiveCategory("Wszystko")
    }
  }

  const addItem = (categoryName, itemName, quantity, unit) => {
    setItems((prevItems) => ({
      ...prevItems,
      [categoryName]: [...prevItems[categoryName], { name: itemName, quantity: Number(quantity), unit }],
    }))

    setHistory((prevHistory) => ({
      ...prevHistory,
      [itemName]: [{ amount: Number(quantity), unit, date: new Date().toLocaleDateString("pl-PL") }],
    }))
  }

  const removeItem = (categoryName, itemName) => {
    setItems((prevItems) => ({
      ...prevItems,
      [categoryName]: prevItems[categoryName].filter((item) => item.name !== itemName),
    }))
    setHistory((prevHistory) => {
      const newHistory = { ...prevHistory }
      delete newHistory[itemName]
      return newHistory
    })
  }

  return (
    <>
      
        {/* <WarehousePanel
          categories={Object.keys(items)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          addCategory={addCategory}
          removeCategory={removeCategory}
          addItem={addItem}
          onOpenManageCategories={() => setIsManageCategoriesOpen(true)}
        /> */}

        <div className="data">
          <div className="items-section">
            <div className="items-header">
              <div className="header-nazwa">Nazwa</div>
              <div className="header-ilosc">Ilość</div>
              <div className="header-jednostka">Jednostka</div>
            </div>
            <div className="items-list">
              {getFilteredItems().map((item, index) => (
                <div
                  key={index}
                  className={`item-row ${selectedItem?.name === item.name ? "selected" : ""}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="item-name">{item.name}</div>
                  <div className="item-quantity">{item.quantity}</div>
                  <div className="item-unit">{item.unit}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-panel">
            <button className="open-item-management" onClick={() => setIsItemManagementOpen(true)}>
              Zarządzaj towarami
            </button>
            <div className="history-section">
              <h2>Historia {selectedItem ? `- ${selectedItem.name}` : ""}</h2>
              {selectedItem ? (
                <>
                  <div className="history-list">
                    {getItemHistory().map((entry, index) => (
                      <div key={index} className="history-item">
                        <span className={`amount ${entry.amount > 0 ? "positive" : "negative"}`}>
                          {entry.amount > 0 ? "+" : ""}
                          {entry.amount} {entry.unit}
                        </span>
                        <span className="date">{entry.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(1)}>+</button>
                    <button onClick={() => updateQuantity(-1)}>-</button>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="Ilość"
                    />
                    <span className="unit-display">{selectedItem.unit}</span>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="DD.MM.RRRR"
                    />
                    <button className="confirm" onClick={handleSubmit}>
                      ✓
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-item-selected">
                  <p>Kliknij w towar, aby wyświetlić historię</p>
                </div>
              )}
            </div>
          </div>
        </div>
      {/* <WarehousePanelWindow
        isOpen={isManageCategoriesOpen}
        onClose={() => setIsManageCategoriesOpen(false)}
        addCategory={addCategory}
        removeCategory={removeCategory}
        categories={Object.keys(items)}
        mode="categories"
      />
      <WarehousePanelWindow
        isOpen={isItemManagementOpen}
        onClose={() => setIsItemManagementOpen(false)}
        addItem={addItem}
        removeItem={removeItem}
        activeCategory={activeCategory}
        items={items}
        mode="items"
        setHistory={setHistory}
      /> */}
    </>
  )
}

export default Warehouse
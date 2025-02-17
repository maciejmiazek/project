import React, { useState } from "react"
import useCrud from "./hooks/UseCrud";
import EditPanel from "./EditPanel/EditPanel";
import "./Warehouse.css"
// import WarehousePanel from "./WarehousePanel"
// import WarehousePanelWindow from "./WarehousePanelWindow"

const Warehouse = () => {
  const [activeCategory, setActiveCategory] = useState("Wszystko")
  const [categories, setcategories] = useState(['Wszystko', 'drewno', 'sypkie', 'worki', 'inne'])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(null)
  const [selectedButton, setSelectedButton] = useState(0)
  const { data: itemData, createHandle, deleteData, activeButton, setActiveButton, alertText, alertIsVisible, formData, setFormData, cardId, setCardId, endpoint, updateHistory} = useCrud('/api/magazyn');

  if (!itemData) {
		return <div>Ładowanie danych...</div>;
	}

  const handleChange = (e) => {
		const clearEndpoint = endpoint.split('/')[2]
		
		if (clearEndpoint === 'magazyn') {
			setFormData((prev) => ({
				...prev,
				'magazyn': {
					  ...prev.magazyn,
					  [e.target.name]: e.target.value
				},
			}));
		}
	};

  const handleChangePut = (e) => {
		const clearEndpoint = endpoint.split('/')[2]
		console.log('a');
		if (clearEndpoint === 'magazyn') {
			setFormData((prev) => ({
				...prev,
				'magazynPut': {
					  ...prev.magazynPut,
					  [e.target.name]: e.target.value,
            'positive': selectedButton === 0 ? true : false
				},
			}));
		}
	};

  const handleClick = () => {
			setFormData((prev) => ({
				...prev,
				'magazynPut': {
            'positive': selectedButton === 0 ? true : false
				},
			}));
  }

  const filteredItems = activeCategory === "Wszystko"
  ? itemData
  : itemData.filter(item => item.category === activeCategory);

  return (
    <>
      <div className="warehouse">
        <div className="items-section">
          <div className="category-bulk">
            {categories.map((item, i) => (
              <div
                key={i} 
                className={`category-option ${activeCategory === item ? "active" : ""}`}
                onClick={() => setActiveCategory(item)}
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="items-header">
            <div className="header-nazwa">Nazwa</div>
            <div className="header-category">Kategoria</div>
            <div className="header-ilosc">Ilość</div>
            <div className="header-jednostka">Jednostka</div>
          </div>
          <div className="items-list">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={`item-row ${selectedItem?.name === item.name ? "selected" : ""}`}
                onClick={() => {setSelectedItem(item), setActiveButton(0), setCardId(index), setSelectedHistoryIndex(null)}}
              >
                <div className="item-name">{item.name}</div>
                <div className="item-category">{item.category}</div>
                <div className="item-quantity">{item.count}</div>
                <div className="item-unit">{item.unit}</div>
                {selectedItem?.name === item.name && activeButton === 1 ? <div className="item-row-delete" onClick={() => {deleteData(index)}}>X</div> : ''}
              </div>
            ))}
          </div>
        </div>
        <div className="right-panel">
          <div className="history-section">
            <button className={`history-display ${activeButton === 0 ? 'active' : ''}`} onClick={() => {setActiveButton(0)}}><p>Historia</p></button>
            <button className={`new-display ${activeButton === 1 ? 'active' : ''}`} onClick={() => {setActiveButton(1)}}><p>Dodaj</p></button>
            {selectedItem && activeButton === 0 ? (<h2>{selectedItem.name}</h2>) : ""}
            {selectedItem && activeButton === 0 ? (
              <>
                  {itemData.map((entry, index) => (
                    selectedItem.name === entry.name && 
                    <div key={index} className="history-item">
                      {entry.history.map((hist, histIndex) => (
                        <div className="item" key={histIndex} onClick={() => {
                          selectedHistoryIndex !== histIndex ? setSelectedHistoryIndex(histIndex) : setSelectedHistoryIndex(null)}}>
                          <p className={`amount ${hist[0] ? "positive" : "negative"}`}>
                            {hist[0] ? "+" : "-"}
                            {hist[1]}
                          </p>
                          <p className="date">{hist[2]?.split("T")[0]}</p>
                          {selectedHistoryIndex === histIndex && (
                            <button 
                              className="item-delete" 
                              onClick={(e) => {
                                e.stopPropagation()
                                updateHistory(index, histIndex)
                                setSelectedHistoryIndex(null)
                              }}
                            >
                              X
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                <div className="quantity-controls">
                  <form onSubmit={createHandle}>
                    <button 
                      type='button'
                      onClick={() => {setSelectedButton(0), handleClick}}
                      className={selectedButton === 0 ? "selected" : ""}
                    >+</button>
                    <button 
                      type='button'
                      onClick={() => {
                        setSelectedButton(1),
                        handleClick
                      }}
                      className={selectedButton === 1 ? "selected" : ""}
                    >-</button>
                    <input
                      type="number"
                      min='1'
                      name="amount"
                      value={formData['magazynPut'].amount}
                      onChange={handleChangePut}
                      placeholder="Ilość"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData['magazynPut'].date}
                      onChange={handleChangePut}
                      required
                    />
                    <button type="submit">✓</button>
                  </form>
                </div>
              </>
            ) : activeButton === 1 ? (
              <form onSubmit={createHandle}>
                <div className="form-bulk">
                  <div className="input-name"><p>Nazwa</p></div>
                  <div className="input-choose">
                    <input type="text" name="name" value={formData['magazyn'].name} onChange={handleChange}/>
                  </div>
                </div>
                <div className="form-bulk">
                  <div className="input-name"><p>Kategoria</p></div>
                  <select name="category" value={formData['magazyn'].category} onChange={handleChange}>
                    <option value="inne">inne</option>
                    <option value="drewno">Drewno</option>
                    <option value="sypkie">Sypkie</option>
                    <option value="worki">Worki</option>
					        </select>
                </div>
                <div className="form-bulk">
                  <div className="input-name"><p>Jednostka</p></div>
                  <select name="unit" value={formData['magazyn'].unit} onChange={handleChange}>
                    <option value="szt.">szt.</option>
                    <option value="kg">Kg</option>
					        </select>
                </div>
                <button type='submit'>Dodaj</button>
              </form>
            ) : (<div>Wybierz Materiał</div>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Warehouse
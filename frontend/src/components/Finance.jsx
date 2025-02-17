import React, { useState } from "react"
import useCrud from "./hooks/UseCrud";
import { IconBorderAll, IconBuildingWarehouse, IconUser, IconTool, IconShoppingBagCheck, IconTruckDelivery, IconNotes, IconHomeUp, IconArrowBigLeftFilled, IconArrowBigRightFilled } from "@tabler/icons-react";
import "./Finance.css"

function Finance() {
  const { data: workersData } = useCrud("/api/pracownicy");
  const { data: financeData, createHandle, deleteData, activeButton, setActiveButton, alertText, alertIsVisible, formData, setFormData, cardId, setCardId, endpoint } = useCrud("/api/finanse");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [buttonChange, setButtonChange] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("Wszystko");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  const images = {
    Wszystko: <IconBorderAll stroke={2} />,
    Pracownicy: <IconUser stroke={2} />,
    Maszyny: <IconTool stroke={2} />,
    Zakupy: <IconShoppingBagCheck stroke={2} />,
    Magazyn: <IconTruckDelivery stroke={2} />,
    Inne:  <IconNotes stroke={2} />,
    Kontrakty: <IconBorderAll stroke={2} />,
  }

  const handleIconClick = (iconName) => {
    alert(`Kliknij to ikona: ${iconName}`)
  }

  const handleChange = (e) => {
		const clearEndpoint = endpoint.split('/')[2]
		
		if (clearEndpoint === 'finanse') {
			setFormData((prev) => ({
				...prev,
				'finanse': {
					  ...prev.finanse,
					  [e.target.name]: e.target.value
				},
			}));
		}
	};

  if (!financeData || !workersData) {
		return <div>Ładowanie danych...</div>;
	}

  return (
    <div className="dashboard">
      <div className="left-panel">
        <div className="top-row">
          <div className="info-box">
            <h3 className="info-title white-text">Bilans miesieczny</h3>
            <p className="amount centered">{financeData[0]?.balance} PLN</p>
          </div>
        </div>

        <div className="middle-row">
          <div className="info-box" onClick={() => {setActiveButton(0)}}>
            <h3 className="info-title orange-text">Koszty miesieczne</h3>
            <p className="amount centered">{financeData[0]?.costs.reduce((acc, item) => acc + item[2], 0)} PLN</p>
          </div>
          <div className="icons-grid">
            <button onClick={() => handleIconClick("Statystyki")} className="icon-button">
              <IconBorderAll stroke={2} />
              <div className="desc"><p>Wszystko</p></div>
            </button>
            <button onClick={() => handleIconClick("Pracownicy")} className="icon-button">
              <IconUser stroke={2} />
              <div className="desc"><p>Pracownicy</p></div>
            </button>
            <button onClick={() => handleIconClick("Narzędzia")} className="icon-button">
              <IconTool stroke={2} />
              <div className="desc"><p>Maszyny</p></div>
            </button>
            <button onClick={() => handleIconClick("Analiza")} className="icon-button">
              <IconShoppingBagCheck stroke={2} />
              <div className="desc"><p>Zakupy</p></div>
            </button>
            <button onClick={() => handleIconClick("Magazyn")} className="icon-button">
              <IconTruckDelivery stroke={2} />
              <div className="desc"><p>Magazyn</p></div>
            </button>
            <button onClick={() => handleIconClick("Dokumenty")} className="icon-button">
              <IconNotes stroke={2} />
              <div className="desc"><p>Inne</p></div>
            </button>
          </div>
        </div>

        <div className="bottom-row">
          <div className="info-box" onClick={() => {setActiveButton(1)}}>
            <h3 className="info-title green-text">Zyski miesieczne</h3>
            <p className="amount centered">{financeData[0]?.gains.reduce((acc, item) => acc + item[2], 0)} PLN</p>
          </div>
          <div className="icons-grid bottom-icons">
            <button onClick={() => handleIconClick("Tabela")} className="icon-button">
              <IconBorderAll stroke={2} />
              <div className="desc"><p>Wszystko</p></div>
            </button>
            <button onClick={() => handleIconClick("Dom")} className="icon-button">
              <IconHomeUp stroke={2} />
              <div className="desc"><p>Kontrakty</p></div>
            </button>
            <button onClick={() => handleIconClick("Lista")} className="icon-button">
              <IconNotes stroke={2} />
              <div className="desc"><p>Inne</p></div>
            </button>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="month-selector">
          <h3>Miesiąc</h3>
          <div className='button-bar'>
					<button >
						<IconArrowBigLeftFilled />
					</button>
					<p>
						{currentDate.toLocaleString("pl-PL", {
							month: "long",
							year: "numeric",
						})}
					</p>
					<button>
						<IconArrowBigRightFilled />
					</button>
				</div>
        </div>

        <div className="costs-panel">
          <button onClick={() => {setButtonChange(0)}}>{activeButton === 0 ? 'Koszty' : 'Zyski'}</button>
          <button onClick={() => {setButtonChange(1)}}>Dodaj</button>
          <div className="costs-list">
            {activeButton === 0 && buttonChange === 0 ? 
              financeData[0]?.costs.map((item, index) => (
                item[0] === "Pracownicy" ? 
                <>
                  <div key={index} className="cost-item worker" onClick={() => {toggleCategory(item[0])}}>
                    <div className="panel">
                      {images[item[0]]}
                      <div className="cost-name">{item[1]}</div>
                      <div className="cost-amount">{
                        workersData.reduce((acc, worker) => worker.salary + acc, 0)
                      } PLN</div>
                    </div>
                    {expandedCategory === "Pracownicy" &&  
                    <div className="expanded-panel">{
                        workersData.map((expandedItem, index) => (
                          <div key={index} className="expanded-item">
                            {images[item[0]]}
                            <div className="cost-name">{expandedItem.name}</div>
                            <div className="cost-amount">{expandedItem.salary} PLN</div>
                          </div>
                      ))}
                    </div>
                    }
                  </div>
                </>
                :
                <div key={index} className="cost-item">
                  {images[item[0]]}
                  <div className="cost-name">{item[1]}</div>
                  <div className="cost-amount">{item[2]} PLN</div>
                </div>
                ))
              : activeButton === 1 && buttonChange === 0 ? financeData[0]?.gains.map((item, index) => (
                <div key={index} className="cost-item">
                  {images[item[0]]}
                  <div className="cost-name">{item[1]}</div>
                  <div className="cost-amount">{item[2]} PLN</div>
                </div>
              ))
              : (
                <form onSubmit={createHandle}>
                  <div className="form-bulk">
                    <div className="input-name"><p>Kategoria</p></div>
                      {activeButton === 0 ?
                        <select name="category" value={formData['finanse'].category} onChange={handleChange}>
                          <option value="maszyny">Maszyny</option>
                          <option value="zakupy">Zakupy</option>
                          <option value="magazyn">Magazyn</option>
                          <option value="inne">Inne</option>
                        </select>
                      : activeButton === 1 ?
                        <select name="category" value={formData['finanse'].category} onChange={handleChange}>
                          <option value="kontrakty">Kontrakty</option>
                          <option value="inne">Inne</option>
                        </select>
                      : null
                    }
                  </div>
                  <div className="form-bulk">
                    <div className="input-name"><p>Nazwa</p></div>
                    <div className="input-choose">
                      <input type="text" name="name" value={formData['finanse'].name} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="form-bulk">
                    <div className="input-name"><p>PLN</p></div>
                    <div className="input-choose">
                      <input type="text" name="count" min={1} value={formData['finanse'].count} onChange={handleChange}/>
                    </div>
                  </div>
                  <button type='submit'>Dodaj</button>
                </form>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finance
import React, { useState, useEffect } from "react";
import useCrud from "../hooks/UseCrud";
import {
  IconBorderAll,
  IconBuildingWarehouse,
  IconUser,
  IconTool,
  IconShoppingBagCheck,
  IconTruckDelivery,
  IconNotes,
  IconHomeUp,
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import "./Finance.css";

function Finance() {
  const { data: workersData } = useCrud("/api/pracownicy");
  const {
    data: financeData,
    createHandle,
    deleteData,
    activeButton,
    setActiveButton,
    alertText,
    alertIsVisible,
    formData,
    setFormData,
    cardId,
    setCardId,
    endpoint,
  } = useCrud("/api/finanse");

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
    Inne: <IconNotes stroke={2} />,
    Kontrakty: <IconBorderAll stroke={2} />,
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleChange = (e) => {
    const clearEndpoint = endpoint.split("/")[2];

    if (clearEndpoint === "finanse") {
      setFormData((prev) => ({
        ...prev,
        finanse: {
          ...prev.finanse,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setFormData((prev) => ({
      ...prev,
      finanse: {
        ...prev.finanse,
        month: currentDate.toLocaleString("pl-PL", { month: "numeric" }),
        year: currentDate.toLocaleString("pl-PL", { year: "numeric" }),
      },
    }));
  };

  if (!financeData || !workersData) {
    return <div>Ładowanie danych...</div>;
  }

  const [foundData, setFoundData] = useState(null);

  useEffect(() => {
    const newFoundData = financeData.find(
      (item) =>
        item.dateId.month == currentDate.toLocaleString("pl-PL", { month: "numeric" }) &&
        item.dateId.year == currentDate.toLocaleString("pl-PL", { year: "numeric" })
    );
  
    setFoundData(newFoundData);
  }, [currentDate, financeData]);

  // Oblicz sumę kosztów
  const totalCosts = foundData?.costs.reduce((acc, item) => acc + item[2], 0) || 0;

  // Oblicz sumę zysków
  const totalGains = foundData?.gains.reduce((acc, item) => acc + item[2], 0) || 0;

  // Oblicz bilans
  const balance = totalGains - totalCosts - workersData.reduce((acc, worker) => worker.salary + acc, 0) || 0;

  // Filtruj koszty i zyski na podstawie wybranej kategorii
  const filteredCosts =
    selectedCategory === "Wszystko"
      ? foundData?.costs || []
      : foundData?.costs.filter((item) => item[0] === selectedCategory) || [];

  const filteredGains =
    selectedCategory === "Wszystko"
      ? foundData?.gains || []
      : foundData?.gains.filter((item) => item[0] === selectedCategory) || [];

  // Dodaj kategorię "Pracownicy" do kosztów, jeśli jej nie ma
  const hasPracownicy = filteredCosts.some((item) => item[0] === "Pracownicy");
  if (!hasPracownicy) {
    filteredCosts.push(["Pracownicy", "Wynagrodzenia", workersData.reduce((acc, worker) => acc + worker.salary, 0)]);
  }

  return (
    <div className='dashboard'>
      <div className='left-panel'>
        <div className='top-row'>
          <div className='info-box'>
            <h3 className='info-title white-text'>Bilans miesieczny</h3>
            <p className='amount centered'>{balance} PLN</p>
          </div>
        </div>

        <div className='middle-row'>
          <div
            className='info-box'
            onClick={() => {
              setActiveButton(0);
              setFormData((prev) => ({
                ...prev,
                finanse: {
                  ...prev.finanse,
                  isCost: 1,
                },
              }));
            }}
          >
            <h3 className='info-title orange-text'>Koszty miesieczne</h3>
            <p className='amount centered'>
              {totalCosts + workersData.reduce((acc, worker) => worker.salary + acc, 0)}{" "}
              PLN
            </p>
          </div>
          <div className='icons-grid'>
            <button
              onClick={() => handleCategoryChange("Wszystko")}
              className='icon-button'
            >
              <IconBorderAll stroke={2} />
              <div className='desc'>
                <p>Wszystko</p>
              </div>
            </button>
            <button
              onClick={() => handleCategoryChange("Pracownicy")}
              className='icon-button'
            >
              <IconUser stroke={2} />
              <div className='desc'>
                <p>Pracownicy</p>
              </div>
            </button>
            <button
              onClick={() => handleCategoryChange("Maszyny")}
              className='icon-button'
            >
              <IconTool stroke={2} />
              <div className='desc'>
                <p>Maszyny</p>
              </div>
            </button>
            <button
              onClick={() => handleCategoryChange("Zakupy")}
              className='icon-button'
            >
              <IconShoppingBagCheck stroke={2} />
              <div className='desc'>
                <p>Zakupy</p>
              </div>
            </button>
            <button
              onClick={() => handleCategoryChange("Magazyn")}
              className='icon-button'
            >
              <IconTruckDelivery stroke={2} />
              <div className='desc'>
                <p>Magazyn</p>
              </div>
            </button>
            <button
              onClick={() => handleCategoryChange("Inne")}
              className='icon-button'
            >
              <IconNotes stroke={2} />
              <div className='desc'>
                <p>Inne</p>
              </div>
            </button>
          </div>
        </div>

        <div className='bottom-row'>
          <div
            className='info-box'
            onClick={() => {
              setActiveButton(1);
              setFormData((prev) => ({
                ...prev,
                finanse: {
                  ...prev.finanse,
                  isCost: 0,
                },
              }));
            }}
          >
            <h3 className='info-title green-text'>Zyski miesieczne</h3>
            <p className='amount centered'>{totalGains} PLN</p>
          </div>
          <div className='icons-grid bottom-icons'>
            <button
              onClick={() => handleCategoryChange("Wszystko")}
              className='icon-button'
            >
              <IconBorderAll stroke={2} />
              <div className='desc'>
                <p>Wszystko</p>
              </div>
            </button>
            <button
              onClick={() => handleCategoryChange("Kontrakty")}
              className='icon-button'
            >
              <IconHomeUp stroke={2} />
              <div className='desc'>
                <p>Kontrakty</p>
              </div>
            </button>
            <button
              onClick={() => handleCategoryChange("Inne")}
              className='icon-button'
            >
              <IconNotes stroke={2} />
              <div className='desc'>
                <p>Inne</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className='right-panel'>
        <div className='month-selector'>
          <h3>Miesiąc</h3>
          <div className='button-bar'>
            <button onClick={handlePreviousMonth}>
              <IconArrowBigLeftFilled />
            </button>
            <p>
              {currentDate.toLocaleString("pl-PL", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <button onClick={handleNextMonth}>
              <IconArrowBigRightFilled />
            </button>
          </div>
        </div>

        <div className='costs-panel'>
          <button
            onClick={() => {
              setButtonChange(0);
            }}
          >
            {activeButton === 0 ? "Koszty" : "Zyski"}
          </button>
          <button
            onClick={() => {
              setButtonChange(1);
            }}
          >
            Dodaj
          </button>
          <div className='costs-list'>
            {activeButton === 0 && buttonChange === 0 ? (
              filteredCosts.map((item, index) =>
                item[0] === "Pracownicy" ? (
                  <>
                    <div
                      key={index}
                      className='cost-item worker'
                      onClick={() => {
                        toggleCategory(item[0]);
                      }}
                    >
                      <div className='panel'>
                        {images[item[0]]}
                        <div className='cost-name'>{item[1]}</div>
                        <div className='cost-amount'>
                          {workersData.reduce(
                            (acc, worker) => worker.salary + acc,
                            0
                          )}{" "}
                          PLN
                        </div>
                      </div>
                      {expandedCategory === "Pracownicy" && (
                        <div className='expanded-panel'>
                          {workersData.map((expandedItem, index) => (
                            <div
                              key={index}
                              className='expanded-item'
                            >
                              {images[item[0]]}
                              <div className='cost-name'>
                                {expandedItem.name}
                              </div>
                              <div className='cost-amount'>
                                {expandedItem.salary} PLN
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    key={index}
                    className='cost-item'
                  >
                    {images[item[0]]}
                    <div className='cost-name'>{item[1]}</div>
                    <div className='cost-amount'>{item[2]} PLN</div>
                  </div>
                )
              )
            ) : activeButton === 1 && buttonChange === 0 ? (
              filteredGains.map((item, index) => (
                <div
                  key={index}
                  className='cost-item'
                >
                  {images[item[0]]}
                  <div className='cost-name'>{item[1]}</div>
                  <div className='cost-amount'>{item[2]} PLN</div>
                </div>
              ))
            ) : (
              <form onSubmit={createHandle}>
                <div className='form-bulk'>
                  <div className='input-name'>
                    <p>Kategoria</p>
                  </div>
                  {activeButton === 0 ? (
                    <select
                      name='category'
                      value={formData["finanse"].category}
                      onChange={handleChange}
                    >
                      <option value='Maszyny'>Maszyny</option>
                      <option value='Zakupy'>Zakupy</option>
                      <option value='Magazyn'>Magazyn</option>
                      <option value='Inne'>Inne</option>
                    </select>
                  ) : activeButton === 1 ? (
                    <select
                      name='category'
                      value={formData["finanse"].category}
                      onChange={handleChange}
                    >
                      <option value='Kontrakty'>Kontrakty</option>
                      <option value='Inne'>Inne</option>
                    </select>
                  ) : null}
                </div>
                <div className='form-bulk'>
                  <div className='input-name'>
                    <p>Nazwa</p>
                  </div>
                  <div className='input-choose'>
                    <input
                      type='text'
                      name='name'
                      value={formData["finanse"].name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='form-bulk'>
                  <div className='input-name'>
                    <p>PLN</p>
                  </div>
                  <div className='input-choose'>
                    <input
                      type='number'
                      name='count'
                      min={1}
                      value={formData["finanse"].count}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type='submit'>Dodaj</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
import React, { useState } from "react";
import useCrud from "./hooks/UseCrud";
import EditPanel from "./EditPanel/EditPanel";
import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from '@tabler/icons-react';
import "./Planning.css";

function Planning() {

	const { data: itemData} = useCrud('/api/pracownicy');
	const { data: machineData} = useCrud('/api/maszyny');
	const { data: planningData, createHandle} = useCrud('/api/planowanie');

	const [currentDate, setCurrentDate] = useState(new Date()); // Aktualna data (zmienia się przy przewijaniu)

	// Funkcja do generowania zakresu dni dla danego miesiąca
	const getDaysInRange = (startDate, daysToShow = 7) => {
	  const days = [];
	  const start = new Date(startDate);
  
	  for (let i = 0; i < daysToShow; i++) {
		const current = new Date(start);
		current.setDate(start.getDate() + i);
		days.push(current);
	  }
  
	  return days;
	};

	const shiftDays = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setDate(currentDate.getDate() + direction * 7); // Przesuń o 7 dni (tydzień)
		setCurrentDate(newDate);
	};

	const daysToDisplay = getDaysInRange(currentDate);

	const handleChange = (e) => {
		console.log(e);
	};

	return (
		<div className='planning'>
			<div className="calendar">
				<div className="button-bar">
					<button onClick={() => shiftDays(-1)}><IconArrowBigLeftFilled /></button>
					<p>{currentDate.toLocaleString("pl-PL", { month: "long", year: "numeric" })}</p>
					<button onClick={() => shiftDays(1)}><IconArrowBigRightFilled /></button>
				</div>
				<div className="calendar-table">
					<div className="user-col">
						<div className="grid-box">Dzien</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<p>{item.name}</p>
								</div>
							)
						})}
					</div>
					<div className="day-col">
						<div className="grid-box">
							<p>{daysToDisplay[0]?.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })}</p>
						</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<div className="bar"></div>
								</div>
							)
						})}
					</div>
					<div className="day-col">
						<div className="grid-box">
							<p>{daysToDisplay[1]?.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })}</p>
						</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<div className="bar"></div>
								</div>
							)
						})}
					</div>
					<div className="day-col">
						<div className="grid-box">
							<p>{daysToDisplay[2]?.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })}</p>
						</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<div className="bar"></div>
								</div>
							)
						})}
					</div>
					<div className="day-col">
					<div className="grid-box">
							<p>{daysToDisplay[3]?.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })}</p>
						</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<div className="bar"></div>
								</div>
							)
						})}
					</div>
					<div className="day-col">
					<div className="grid-box">
							<p>{daysToDisplay[4]?.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })}</p>
						</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<div className="bar"></div>
								</div>
							)
						})}
					</div>
					<div className="day-col">
						<div className="grid-box">
							<p>{daysToDisplay[5]?.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })}</p>
						</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<div className="bar"></div>
								</div>
							)
						})}
					</div>
					<div className="day-col">
						<div className="grid-box">
							<p>{daysToDisplay[6]?.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" })}</p>
						</div>
						{itemData.map((item, i) => {
							return (
								<div className="grid-box" key={i}>
									<div className="bar"></div>
								</div>
							)
						})}
					</div>
					<div className="background-col"></div>
				</div>
			</div>
			<div className="planning-panel">
				<button className="panel-task">Zadanie</button>
				<button className="new-task">Dodaj</button>
				<button className="edit-task">Edytuj</button>
				<form onSubmit={handleChange}>
					<div className="worker-col">
						<p>Pracownik</p>
						<select name="usingWorker">
							<option value="">Wybierz Pracownika</option>
							{itemData.map((item, index) => (
								<option key={index} value={item.name}>{item.name}</option>
							))}
						</select>
					</div>
					<div className="start-date-col">
						<p>Data Rozpoczęcia</p>
						<input type="date" name="" id="" />
					</div>
					<div className="end-date-col">
						<p>Data Końca</p>
						<input type="date" name="" id="" />
					</div>
					<div className="machine-col">
						<p>Maszyny</p>
						<select name="machine">
						<option value="">Wybierz maszynę</option>
						{machineData.map((item, index) => (
							<option key={index} value={item.name}>{item.name}</option>
						))}
					</select>
					</div>
					<div className="description-col">
						<p>Opis</p>
						<textarea name="description" id="" cols="25" rows="5"></textarea>
					</div>
					<button type="submit">Dodaj</button>
				</form>
			</div>
		</div>
	);
}

export default Planning;

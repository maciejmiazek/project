import { React, useState, useEffect } from "react";
import WorkersPanel from "./WorkersPanel";
import "./Workers.css";
import axios from "axios";
import {
	IconUser,
	IconClockHour4
} from "@tabler/icons-react";

function Workers() {

	return (
		<div className='workers'>
			<div className='workers-main'>
				{users.map((item, i) => {
					return (
					<div key={i} className={`card-board ${activeButton === 1 ? 'edit' : ''}`} style={{border: cardId === i && activeButton === 1 ? '3px solid whitesmoke' : ''}} onClick={() => {editInsert(i)}}>
						<div className="worker-avatar">
							<div className="status-box">Aktywny</div>
							<div className="circle">
								<IconUser stroke={2} />
							</div>
							<p>{item.name}</p>
						</div>
						<div className="worker-items">
							<div className="item-option">
								<div className="item-option-name">
									<p>Czas Pracy</p>
								</div>
								<div className="item-option-value">
									<p>{`${item.startWorkTime} - ${item.endWorkTime}`}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Pensja</p>
								</div>
								<div className="item-option-value">
									<p>{`${item.salary} PLN`}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Telefon</p>
								</div>
								<div className="item-option-value">
									<p>{item.phone != '' ? item.phone : '-'}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Maszyna</p>
								</div>
								<div className="item-option-value">
									<p>{item.machine != '' ? item.machine : 'brak'}</p>
								</div>
							</div>
							<button className="delete-option" onClick={() => {deleteWorker(i)} } style={buttonStyle}>Delete</button>
						</div>
					</div>)
				})}
			</div>
			<WorkersPanel activeButton={activeButton} buttonChangeClick={buttonChangeClick} buttonText={buttonText} fetchAPI={fetchAPI} setAlertText={setAlertText} setAlertIsVisible={setAlertIsVisible} formData={formData} setFormData={setFormData} updateWorker={updateWorker}/>
			<div className={`workers-alert ${alertIsVisible ? 'show' : ''}`}><p>{alertText}</p></div>
		</div>
	);
}

export default Workers;

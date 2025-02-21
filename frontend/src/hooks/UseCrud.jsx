import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function useCrud(endpoint) {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [alertText, setAlertText] = useState('');
  const [alertIsVisible, setAlertIsVisible] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    pracownicy: {
      name: '',
      phone: '',
      machine: '',
      salary: 0,
      startWorkTime: '6:00',
      endWorkTime: '16:00',
    },
    maszyny: {
      name: '',
      isUsingSince: '',
      capacity: 0,
      usingWorker: '',
      description: '',
      imgUrl: '',
    },
    planowanie: {
      workerId: "",
      startDate: "",
      endDate: "",
      description: "",
      machineId: "",
    },
    magazyn: {
      name: '',
      category: 'inne',
      count: 0,
      unit: 'szt.',
      history: [],
    },
    magazynPut: {
      positive: true,
      amount: 0,
      date: '',
    },
    finanse: {
      name: '',
      category: 'Maszyny',
      count: 0,
    },
	});

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (e) {
      setAlertText(e);
			setAlertIsVisible(true);
    }
  };

  const createHandle = async (e) => {
    e.preventDefault()
    if (endpoint === '/api/finanse') {
      if (activeButton === 0) {
        createData()
      }
      return
    }
    if (endpoint === '/api/magazyn') {
      if (activeButton === 1) {
        createData()
      }else if (activeButton === 0) {
        updateData(cardId)
      }
      return
    }
    if (activeButton === 0) {
      createData();
    } else if (activeButton === 1) {
      updateData(cardId);
    }
  }

  const createData = async () => {
    
			try {
				const response = await axios.post(`${endpoint}`, formData[endpoint.split('/')[2]]);
		  
				if (response.status === 200) {
				  console.log(response.data);
				  setAlertText(response.data.message);
				  setAlertIsVisible(true);
				  fetchData();
				  setTimeout(() => {
					  setAlertIsVisible(false);
				  }, 3000);
				}
			} catch (e) {
				setError(e)
			}
  }
  
  const updateData = async (id) => {
    console.log(id);

    const objectId = typeof id === "number" ? data[id]?._id : id;

    if (endpoint === '/api/magazyn') {
      try {
        const response = await axios.put(`${endpoint}/${objectId}`, formData['magazynPut']);
  
        if (response.status === 200) {
          console.log(response.data.message);
          setAlertText(response.data.message);
          setAlertIsVisible(true);
          fetchData();
          setTimeout(() => {
            setAlertIsVisible(false);
          }, 3000);
        }
  
      } catch (e) {
        setError(e);
      }
      return
    }

    try {
      const response = await axios.put(`${endpoint}/${objectId}`, formData[endpoint.split('/')[2]]);

      if (response.status === 200) {
        console.log(response.data.message);
        setAlertText(response.data.message);
        setAlertIsVisible(true);
        fetchData();
        setTimeout(() => {
          setAlertIsVisible(false);
        }, 3000);
      }

    } catch (e) {
      setError(e);
    }
  }

  const updateHistory = async (selectId, historyId) => {
    
    const objectId = data[selectId]._id;
    try {
      const response = await axios.put(`${endpoint}/${objectId}`, {historyId: historyId});

      if (response.status === 200) {
        console.log(response.data.message);
        setAlertText(response.data.message);
        setAlertIsVisible(true);
        fetchData();
        setTimeout(() => {
          setAlertIsVisible(false);
        }, 3000);
      }

    } catch (e) {
      setError(e);
    }
  }

  const deleteData = async (id) => {
    if (activeButton !== 1) {
      return
    }

		const objectId = data[id]._id

    try {
      const response = await axios.delete(`${endpoint}/${objectId}`);

      if (response.status === 200) {
			  console.log(response.data);
        setAlertText(response.data.message);
			  setAlertIsVisible(true);
			  fetchData();
			  setTimeout(() => {
				  setAlertIsVisible(false);
			  }, 3000);
			}

    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [endpoint]);
 
  return { data, createHandle, updateData, deleteData, activeButton, setActiveButton, alertText, alertIsVisible, formData, setFormData ,cardId, setCardId, endpoint, updateHistory};
}

export default useCrud;
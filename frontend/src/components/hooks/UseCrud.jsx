import { useState, useEffect } from "react";
import axios from "axios";

function useCrud(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const createData = async (payload) => {
    // POST
    try {
      const response = await axios.post(endpoint, payload);
      fetchData();
      return response.data;
    } catch (e) {
      setError(e);
    }
  };

  const updateData = async (id, payload) => {
    // PUT
    try {
      const response = await axios.put(`${endpoint}/${id}`, payload);
      fetchData();
      return response.data;
    } catch (e) {
      setError(e);
    }
  };

  const deleteData = async (id) => {
    // DELETE
    try {
      const response = await axios.delete(`${endpoint}/${id}`);
      fetchData();
      return response.data;
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, isLoading, error, createData, updateData, deleteData };
}

export default useCrud;
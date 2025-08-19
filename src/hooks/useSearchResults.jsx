import axios from "../utils/axios";
import { useEffect, useState } from "react";

const useSearchResults = (search) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async () => {
    if (!search) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.get(`/users/alluser?search=${search}`);
      if (data) {
        setUsers(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchSearchResults();

    return () => setUsers([]);
  }, [search]);

  console.log(users);

  return { users, loading };
};

export default useSearchResults;

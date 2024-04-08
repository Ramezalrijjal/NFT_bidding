import { useState, useEffect } from 'react';
import axios from 'axios'; // You may use another library for HTTP requests


function useApiData(apiUrl) {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [apiUrl]);


    return { data };
}

export default useApiData;

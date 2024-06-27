import { useState, useEffect } from "react";

const useFetchApplication = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
   // const[handleSearch,setHandleSearch] = useState(false)

    useEffect(() => {
        const getApplicationData = async () => {
            setLoading(true);

            try {
                const res = await fetch("https://appsala-backend.netlify.app/.netlify/functions/index/products");
                const result = await res.json();
                console.warn(result)
                setData(result.data); // Assuming result contains the data you need
            } catch (err) {
                console.error("Fetch error:", err.message);
            } finally {
                setLoading(false);
            }
        };

        getApplicationData();
    }, []); // Empty dependency array ensures this runs only once

    return { data, loading};
};

export default useFetchApplication;

import { useState, useEffect } from "react";

export function FetchData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if(loading){
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        }
        setLoading(false);
    }, []);

    return {data, loading};
}
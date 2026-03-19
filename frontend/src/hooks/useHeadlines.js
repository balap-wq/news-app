import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function useHeadlines({page = 1,category,country}){

    const[ data, setData] = useState([]);

    const[ loading, setLoading] = useState(false);

    const[ error, setError]=useState(null);

    const[ totalResults, setTotalResults]=useState(0);

    useEffect(()=>{

        const controller = new AbortController();

        const fetchHeadlines = async ()=>{
            setLoading(true);
            setError(null);

            try{
                const response = await axiosInstance.get("/api/headlines",{
                    params:{page,category,country},
                    signal:controller.signal
                });

                setData(response.data.articles|| response.data.data || [])
                setTotalResults(response.data.totalResults || response.data.total ||0);

                }catch (err) {
                    if (err.name !=="CanceledError"){
                        setError(err.message);
                    }
                } finally{
                    setLoading(false);
                }
            };

            fetchHeadlines();

            return ()=>{
                controller.abort();
            };

        },[page,category,country]);

        return{data,loading,error,totalResults};

} 

export default useHeadlines;
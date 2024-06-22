import { useEffect, useState } from "react";
import { api } from "../../service/api";

export default function useGetLevels() {
    const [levels, setLevels] = useState<number[]>([]);

    useEffect(() => {
        api.get('/level').then((res) => {
            setLevels(res.data);
        })
    }, [])
    
    return levels
}